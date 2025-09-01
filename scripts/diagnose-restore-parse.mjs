#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkMdx from 'remark-mdx';
import remarkGfm from 'remark-gfm';
import remarkFrontmatter from 'remark-frontmatter';
import remarkDeflist from 'remark-deflist';
import sanitizerPkg from '../utils/sanitizer.mjs';
import slices from '../utils/slices.mjs';

const { sanitizeBeforeParse, dropLeadingSliceArtifacts, autoCloseInfoBlocks, autoCloseSecretBlocks, escapeCurlyForMDX } = sanitizerPkg;
const { maskBlocks, restoreBlocks, splitToSlices } = slices;

const fileArg = process.argv[2];
if (!fileArg) {
  console.error('Usage: node scripts/diagnose-restore-parse.mjs /abs/path/to/workshop.md [--max=NN]');
  process.exit(2);
}
const max = Number((process.argv.find(a => a.startsWith('--max=')) || '').split('=')[1]) || 999;

const filePath = path.isAbsolute(fileArg) ? fileArg : path.join(process.cwd(), fileArg);
const raw0 = fs.readFileSync(filePath, 'utf8');
const raw = autoCloseSecretBlocks(autoCloseInfoBlocks(raw0));
const { masked, codeEditorSegments, secretSegments, infoSegments } = maskBlocks(raw);
const maskedSanitized = sanitizeBeforeParse(masked);
const slicesArr = splitToSlices(maskedSanitized, { longPages: false });

let maskedErrs = 0;
let restoredErrs = 0;
for (let i = 0; i < Math.min(slicesArr.length, max); i++) {
  const slice = slicesArr[i];
  const maskedClean = escapeCurlyForMDX(dropLeadingSliceArtifacts(sanitizeBeforeParse(slice)));
  try {
    unified().use(remarkParse, { fragment: true }).use(remarkMdx).use(remarkGfm).use(remarkFrontmatter).use(remarkDeflist).parse(maskedClean);
  } catch (e) {
    maskedErrs++;
    const where = (e && (e.line != null && e.column != null)) ? ` (at ${e.line}:${e.column})` : '';
    console.log(`MASKED err page=${i + 2}${where} ${e?.reason || e?.message || String(e)}`);
    continue;
  }
  // Now restore placeholders and try parsing again like the browser renderer path
  const restored = restoreBlocks(slice, { codeEditorSegments, secretSegments, infoSegments });
  const restoredClean = escapeCurlyForMDX(dropLeadingSliceArtifacts(sanitizeBeforeParse(restored)));
  try {
    unified().use(remarkParse, { fragment: true }).use(remarkMdx).use(remarkGfm).use(remarkFrontmatter).use(remarkDeflist).parse(restoredClean);
  } catch (e) {
    restoredErrs++;
    const where = (e && (e.line != null && e.column != null)) ? ` (at ${e.line}:${e.column})` : '';
    console.log(`RESTORED err page=${i + 2}${where} ${e?.reason || e?.message || String(e)}`);
  }
}

if (maskedErrs === 0 && restoredErrs === 0) {
  console.log(`All slices OK masked+restored for ${filePath} pages=${slicesArr.length}`);
} else {
  console.log(`Done. Masked errors=${maskedErrs}, Restored errors=${restoredErrs}`);
}

