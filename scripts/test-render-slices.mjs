import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import sanitizerPkg from '../utils/sanitizer.mjs';
const { sanitizeBeforeParse, autoCloseInfoBlocks, autoCloseSecretBlocks, dropLeadingSliceArtifacts } = sanitizerPkg;
import slices from '../utils/slices.mjs';
const { maskBlocks, restoreBlocks, splitToSlices, mdxParseMaskedSliceOrThrow } = slices;

// Use shared mask/restore/split from utils/slices.mjs

async function main() {
  // Usage: node scripts/test-render-slices.mjs [file] [--max-pages=N] [--mdx] [--no-mdx] [--restored] [--stop-on-error]
  const args = process.argv.slice(2);
  let file = 'javascript.md';
  let maxPages = 30; // default small cap to avoid timeouts
  let doMdx = false; // default off for speed; enable with --mdx
  let stopOnError = false;
  let parseRestored = false; // when --mdx: parse restored content (browser parity)
  for (const a of args) {
    if (!a.startsWith('--') && !file) file = a;
    else if (!a.startsWith('--') && file === 'javascript.md') file = a; // first positional wins
    else if (a.startsWith('--max-pages=')) {
      const n = Number(a.split('=')[1]);
      if (Number.isFinite(n) && n > 0) maxPages = Math.min(n, 500);
    } else if (a === '--mdx') doMdx = true;
    else if (a === '--no-mdx') doMdx = false;
    else if (a === '--restored') parseRestored = true;
    else if (a === '--stop-on-error') stopOnError = true;
  }
  const filePath = path.isAbsolute(file) ? file : path.join(process.cwd(), file);
  const raw = fs.readFileSync(filePath, 'utf8');
  const fm = matter(raw);
  const longPages = fm.data?.long_pages === true || fm.data?.long_pages === 'true';
  const preAuto = autoCloseSecretBlocks(autoCloseInfoBlocks(fm.content));
  const { masked, codeEditorSegments, secretSegments, infoSegments } = maskBlocks(preAuto);
  const maskedSanitized = sanitizeBeforeParse(masked);
  const slices = splitToSlices(maskedSanitized, { longPages });
  const results = [];
  const limit = Math.min(slices.length, maxPages);
  for (let i=0;i<limit;i++){
    const slice = slices[i];
    // For MDX parse, default to masked (placeholders). If --restored, parse restored content instead.
    const target = doMdx ? (parseRestored ? restoreBlocks(slice, { codeEditorSegments, secretSegments, infoSegments }) : slice)
                         : restoreBlocks(slice, { codeEditorSegments, secretSegments, infoSegments });
    let cleaned = dropLeadingSliceArtifacts(sanitizeBeforeParse(target));
    if (doMdx) {
      try {
        // Literal identity: use the same helper the browser calls
        mdxParseMaskedSliceOrThrow(cleaned);
        results.push({ page: i+2, ok: true });
      } catch (e) {
        const where = (e && (e.line != null && e.column != null)) ? ` (at ${e.line}:${e.column})` : '';
        const mode = parseRestored ? 'RESTORED' : 'MASKED';
        const err = { page: i+2, ok: false, reason: `${mode} ${e?.reason || e?.message || String(e)}${where}` };
        const lines = cleaned.split(/\r?\n/);
        const L = lines.length;
        const errLine = (e && typeof e.line === 'number') ? e.line : 1;
        const start = Math.max(1, errLine - 30);
        const end = Math.min(L, errLine + 10);
        const snippet = lines.slice(start - 1, end).map((ln, idx) => String(start + idx).padStart(4,' ') + ': ' + ln).join('\n');
        console.log(`--- slice page=${i+2} lines ${start}-${end} ---\n${snippet}\n--- end slice ---`);
        results.push(err);
        if (stopOnError) break;
      }
    } else {
      // Fast path: look for common problematic patterns specifically at slice start
      const firstNonEmpty = cleaned.split(/\r?\n/).find(l => l.trim() !== '');
      if (firstNonEmpty && /^\s*<\s*\/\s*Quiz\s*>\s*$/.test(firstNonEmpty)) {
        results.push({ page: i+2, ok: false, reason: 'Stray </Quiz> at slice start' });
        if (stopOnError) break;
      } else if (firstNonEmpty && /^\s*\/>\s*$/.test(firstNonEmpty)) {
        results.push({ page: i+2, ok: false, reason: 'Dangling /> at slice start' });
        if (stopOnError) break;
      } else {
        results.push({ page: i+2, ok: true });
      }
    }
  }
  const errors = results.filter(r => !r.ok);
  if (errors.length === 0) {
    console.log(`ok pages=${results.length}/${slices.length}`);
  } else {
    for (const err of errors) {
      console.log(`err page=${err.page} ${err.reason}`);
    }
  }
}

main().catch(e => { console.error(e); process.exit(1); });
