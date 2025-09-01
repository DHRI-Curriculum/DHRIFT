#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import sanitizerPkg from '../utils/sanitizer.mjs';
import matter from 'gray-matter';
import slices from '../utils/slices.mjs';
const { sanitizeBeforeParse, dropLeadingSliceArtifacts, autoCloseInfoBlocks, autoCloseSecretBlocks } = sanitizerPkg;
const { maskBlocks, splitToSlices, mdxParseMaskedSliceOrThrow } = slices;

const root = process.argv[2] || process.env.WORKSHOPS_DIR || 'apps/workshops';
const dir = path.isAbsolute(root) ? root : path.join(process.cwd(), root);

function* walk(dirPath) {
  const ents = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const e of ents) {
    const p = path.join(dirPath, e.name);
    if (e.isDirectory()) yield* walk(p);
    else if (e.isFile() && p.endsWith('.md')) yield p;
  }
}

let hadError = false;
const IGNORE = new Set(['catch-our-dhrift.md','DHRIFT_workshop-template.md']);

for (const filePath of walk(dir)) {
  const base = path.basename(filePath);
  if (IGNORE.has(base)) { continue; }
  const raw = fs.readFileSync(filePath, 'utf8');
  const preAuto = autoCloseSecretBlocks(autoCloseInfoBlocks(raw));
  const fm = matter(raw);
  const longPages = fm.data?.long_pages === true || fm.data?.long_pages === 'true';
  const { masked } = maskBlocks(preAuto);
  const maskedSanitized = sanitizeBeforeParse(masked);
  const slicesArr = splitToSlices(maskedSanitized, { longPages });
  let ok = 0; let total = slicesArr.length; let errs = [];
  for (let i = 0; i < total; i++) {
    const sliceText = slicesArr[i];
    // Masked parse (browser parity)
    try {
      const cleanedMasked = dropLeadingSliceArtifacts(sanitizeBeforeParse(sliceText));
      mdxParseMaskedSliceOrThrow(cleanedMasked);
      ok++;
    } catch (e) {
      const where = (e && (e.line != null && e.column != null)) ? ` (at ${e.line}:${e.column})` : '';
      errs.push(`MASKED err page=${i + 2}${where} ${e?.reason || e?.message || String(e)}`);
    }
  }
  if (errs.length) {
    hadError = true;
    console.log(`=== ${filePath} ===`);
    for (const s of errs) console.log(s);
  } else {
    console.log(`ok ${filePath} pages=${ok}/${total}`);
  }
}

if (hadError) process.exit(1);
else process.exit(0);
