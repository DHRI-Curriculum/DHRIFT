// Debug specific failing slices
import sanitizerPkg from './utils/sanitizer.mjs';
const { sanitizeBeforeParse, dropLeadingSliceArtifacts, escapeCurlyForMDX, autoCloseInfoBlocks, autoCloseSecretBlocks } = sanitizerPkg;
import slicesUtil from './utils/slices.mjs';
const { maskBlocks, splitToSlices } = slicesUtil;

async function main() {
  // Fetch html-css.md
  const url = 'https://raw.githubusercontent.com/GC-DRI/DRI26/main/html-css.md';
  const raw = await (await fetch(url)).text();

  const preAuto = autoCloseSecretBlocks(autoCloseInfoBlocks(raw));
  const { masked } = maskBlocks(preAuto);
  const escaped = escapeCurlyForMDX(masked);
  const sanitized = sanitizeBeforeParse(escaped);
  const slices = splitToSlices(sanitized, { longPages: false });

  // Get slice 32 (index 31)
  const slice = slices[31];
  const cleaned = dropLeadingSliceArtifacts(sanitizeBeforeParse(slice));
  const sliceEscaped = escapeCurlyForMDX(cleaned);

  console.log('=== SLICE 32 of html-css.md ===');
  console.log('Length:', sliceEscaped.length);
  console.log('\n--- Lines 40-50 (where error occurs at line 45) ---\n');

  const lines = sliceEscaped.split('\n');
  for (let i = 39; i < Math.min(55, lines.length); i++) {
    const line = lines[i];
    const marker = i === 44 ? ' <<<< LINE 45' : '';
    console.log(`${String(i + 1).padStart(3)}: ${line}${marker}`);

    // Show column 39 if this is line 45
    if (i === 44 && line.length >= 39) {
      console.log(`      ${' '.repeat(38)}^ col 39`);
    }
  }

  // Check for unescaped curlies
  console.log('\n--- Checking for unescaped curlies ---');
  let inFence = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.replace(/^\s+/, '');
    if (trimmed.startsWith('```') || trimmed.startsWith('~~~')) {
      inFence = !inFence;
      continue;
    }
    if (!inFence) {
      // Check for raw { or } not in inline code
      let inInline = false;
      for (let j = 0; j < line.length; j++) {
        if (line[j] === '`') inInline = !inInline;
        if (!inInline && (line[j] === '{' || line[j] === '}')) {
          console.log(`Line ${i + 1}, col ${j + 1}: Found unescaped '${line[j]}'`);
          console.log(`  Context: ...${line.slice(Math.max(0, j - 20), j + 20)}...`);
        }
      }
    }
  }
}

main().catch(console.error);
