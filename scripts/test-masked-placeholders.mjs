#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import sanitizerPkg from '../utils/sanitizer.mjs';
import slices from '../utils/slices.mjs';
const { sanitizeBeforeParse, dropLeadingSliceArtifacts } = sanitizerPkg;
const { maskBlocks, splitToSlices, mdxParseMaskedSliceOrThrow } = slices;

// Validate and summarize how masked placeholders would be handled at render time.
// Usage:
//   node scripts/test-masked-placeholders.mjs <file> [--page=N] [--max=NN]

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error('Usage: node scripts/test-masked-placeholders.mjs <file> [--page=N] [--max=NN]');
  process.exit(2);
}

let file = args[0];
let pageOpt = null;
let max = 999;
for (const a of args.slice(1)) {
  if (a.startsWith('--page=')) pageOpt = Number(a.split('=')[1]);
  else if (a.startsWith('--max=')) max = Number(a.split('=')[1]);
}

const filePath = path.isAbsolute(file) ? file : path.join(process.cwd(), file);
const raw = fs.readFileSync(filePath, 'utf8');
const fm = matter(raw);

const preSan = sanitizeBeforeParse(fm.content);
const { masked, codeEditorSegments, secretSegments, infoSegments } = maskBlocks(preSan);
const maskedSanitized = sanitizeBeforeParse(masked);
const longPages = fm.data?.long_pages === true || fm.data?.long_pages === 'true';
const slicesArr = splitToSlices(maskedSanitized, { longPages });

const re = /<\s*dhrift-(codeeditor|secret|info)\b([^>]*)>(?:<\/\s*dhrift-\1\s*>)?/gi;

function getIndex(attrs) {
  const m = /data-index\s*=\s*"?(\d+)"?/i.exec(attrs || '');
  return m ? Number(m[1]) : -1;
}

let start = 0, end = slicesArr.length;
if (typeof pageOpt === 'number' && !Number.isNaN(pageOpt)) {
  const idx = pageOpt - 2; // 1-based (Frontmatter=1)
  if (idx >= 0 && idx < slicesArr.length) { start = idx; end = idx + 1; }
}
end = Math.min(end, start + max);

for (let i = start; i < end; i++) {
  const page = i + 2;
  const maskedSlice = dropLeadingSliceArtifacts(sanitizeBeforeParse(slicesArr[i]));
  try { mdxParseMaskedSliceOrThrow(maskedSlice); } catch (e) {
    console.log(`MASKED err page=${page} ${(e?.reason||e?.message||String(e))}`);
    continue;
  }
  let codeCount = 0, secretCount = 0, infoCount = 0;
  const bad = [];
  maskedSlice.replace(re, (m, kind, attrs) => {
    const idx = getIndex(attrs);
    if (kind === 'codeeditor') {
      codeCount++;
      if (idx < 0 || idx >= codeEditorSegments.length) bad.push(`codeeditor idx=${idx} out of range`);
    } else if (kind === 'secret') {
      secretCount++;
      if (idx < 0 || idx >= secretSegments.length) bad.push(`secret idx=${idx} out of range`);
    } else if (kind === 'info') {
      infoCount++;
      if (idx < 0 || idx >= infoSegments.length) bad.push(`info idx=${idx} out of range`);
    }
    return m;
  });
  const parts = [];
  if (codeCount) parts.push(`code=${codeCount}`);
  if (secretCount) parts.push(`secret=${secretCount}`);
  if (infoCount) parts.push(`info=${infoCount}`);
  const summary = parts.length ? parts.join(' ') : 'no placeholders';
  if (bad.length) {
    console.log(`page=${page} ${summary} INVALID: ${bad.join('; ')}`);
  } else {
    console.log(`page=${page} ${summary}`);
  }
}

