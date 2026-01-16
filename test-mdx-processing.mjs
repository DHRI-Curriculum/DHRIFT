// Test script to verify MDX processing on DRI26 workshops
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkMdx from 'remark-mdx';
import remarkGfm from 'remark-gfm';
import remarkFrontmatter from 'remark-frontmatter';
import remarkDeflist from 'remark-deflist';
import sanitizerPkg from './utils/sanitizer.mjs';

const { sanitizeBeforeParse, dropLeadingSliceArtifacts, escapeCurlyForMDX, autoCloseInfoBlocks, autoCloseSecretBlocks } = sanitizerPkg;

// Import slices utilities
import slicesUtil from './utils/slices.mjs';
const { maskBlocks, splitToSlices } = slicesUtil;

const workshops = [
  'command-line',
  'data-literacies',
  'html-css',
  'pandas',
  'python',
  'text-analysis'
];

async function fetchWorkshop(name) {
  const url = `https://raw.githubusercontent.com/GC-DRI/DRI26/main/${name}.md`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${name}: ${res.status}`);
  return res.text();
}

function testMdxParse(content, name, sliceIndex = null) {
  try {
    unified()
      .use(remarkParse, { fragment: true })
      .use(remarkMdx)
      .use(remarkGfm)
      .use(remarkFrontmatter)
      .use(remarkDeflist)
      .parse(content);
    return { success: true };
  } catch (e) {
    return {
      success: false,
      error: e.message,
      position: e.position || null
    };
  }
}

async function testWorkshop(name) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`Testing: ${name}.md`);
  console.log('='.repeat(60));

  const raw = await fetchWorkshop(name);
  console.log(`  Fetched: ${raw.length} chars`);

  // Step 1: Auto-close blocks
  const preAuto = autoCloseSecretBlocks(autoCloseInfoBlocks(raw));

  // Step 2: Mask custom components
  const { masked, codeEditorSegments, secretSegments, infoSegments, keywordSegments } = maskBlocks(preAuto);
  console.log(`  Masked: ${codeEditorSegments.length} CodeEditor, ${secretSegments.length} Secret, ${infoSegments.length} Info, ${keywordSegments.length} Keywords`);

  // Step 3: Escape curlies
  const escaped = escapeCurlyForMDX(masked);

  // Step 4: Sanitize
  const sanitized = sanitizeBeforeParse(escaped);

  // Step 5: Test full document parse
  console.log(`\n  Testing full document...`);
  const fullResult = testMdxParse(sanitized, name);
  if (fullResult.success) {
    console.log(`  ✅ Full document: PASSED`);
  } else {
    console.log(`  ❌ Full document: FAILED`);
    console.log(`     Error: ${fullResult.error}`);
  }

  // Step 6: Split into slices and test each
  const slices = splitToSlices(sanitized, { longPages: false });
  console.log(`\n  Testing ${slices.length} slices...`);

  let failures = [];
  for (let i = 0; i < slices.length; i++) {
    const slice = slices[i];
    const cleaned = dropLeadingSliceArtifacts(sanitizeBeforeParse(slice));
    const sliceEscaped = escapeCurlyForMDX(cleaned);

    const result = testMdxParse(sliceEscaped, name, i);
    if (!result.success) {
      failures.push({
        slice: i + 1,
        error: result.error,
        position: result.position,
        preview: sliceEscaped.slice(0, 200)
      });
    }
  }

  if (failures.length === 0) {
    console.log(`  ✅ All ${slices.length} slices: PASSED`);
  } else {
    console.log(`  ❌ ${failures.length}/${slices.length} slices FAILED:`);
    for (const f of failures) {
      console.log(`\n     Slice ${f.slice}:`);
      console.log(`     Error: ${f.error}`);
      if (f.position) {
        console.log(`     Position: line ${f.position.start?.line}, col ${f.position.start?.column}`);
      }
      console.log(`     Preview: ${f.preview.replace(/\n/g, '\\n').slice(0, 100)}...`);
    }
  }

  return { name, fullResult, sliceFailures: failures };
}

async function main() {
  console.log('MDX Processing Test Suite');
  console.log('Testing DRI26 workshops through the full processing pipeline\n');

  const results = [];
  for (const name of workshops) {
    try {
      const result = await testWorkshop(name);
      results.push(result);
    } catch (e) {
      console.log(`\n❌ Failed to test ${name}: ${e.message}`);
      results.push({ name, error: e.message });
    }
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('SUMMARY');
  console.log('='.repeat(60));

  let totalPassed = 0;
  let totalFailed = 0;

  for (const r of results) {
    if (r.error) {
      console.log(`❌ ${r.name}: Fetch/processing error`);
      totalFailed++;
    } else if (r.sliceFailures.length > 0) {
      console.log(`❌ ${r.name}: ${r.sliceFailures.length} slice(s) failed`);
      totalFailed++;
    } else {
      console.log(`✅ ${r.name}: All tests passed`);
      totalPassed++;
    }
  }

  console.log(`\nTotal: ${totalPassed} passed, ${totalFailed} failed`);
}

main().catch(console.error);
