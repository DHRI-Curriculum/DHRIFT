// Debug the data-literacies table issue
import sanitizerPkg from './utils/sanitizer.mjs';
const { sanitizeBeforeParse, dropLeadingSliceArtifacts, escapeCurlyForMDX, autoCloseInfoBlocks, autoCloseSecretBlocks } = sanitizerPkg;
import slicesUtil from './utils/slices.mjs';
const { maskBlocks, splitToSlices } = slicesUtil;

async function main() {
  const url = `https://raw.githubusercontent.com/GC-DRI/DRI26/main/data-literacies.md`;
  const raw = await (await fetch(url)).text();

  const preAuto = autoCloseSecretBlocks(autoCloseInfoBlocks(raw));
  const { masked } = maskBlocks(preAuto);
  const escaped = escapeCurlyForMDX(masked);
  const sanitized = sanitizeBeforeParse(escaped);
  const slices = splitToSlices(sanitized, { longPages: false });

  const slice = slices[31]; // slice 32 (0-indexed)
  const cleaned = dropLeadingSliceArtifacts(sanitizeBeforeParse(slice));
  const sliceEscaped = escapeCurlyForMDX(cleaned);

  console.log('=== data-literacies.md SLICE 32 ===');
  console.log(`Total lines: ${sliceEscaped.split('\n').length}`);

  const lines = sliceEscaped.split('\n');
  // Show lines 70-85 around the error at line 78
  console.log('\n--- Lines 70-90 (error at line 78) ---\n');
  for (let i = 69; i < Math.min(90, lines.length); i++) {
    const marker = i === 77 ? ' <<< LINE 78' : '';
    console.log(`${String(i + 1).padStart(3)}: ${lines[i]}${marker}`);
  }

  // Check for tr/table balance
  console.log('\n--- Checking tr/table balance ---');
  let trOpen = 0;
  let tableOpen = 0;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trOpeners = (line.match(/<\s*tr\b[^>]*>/gi) || []).length;
    const trClosers = (line.match(/<\s*\/\s*tr\s*>/gi) || []).length;
    const tableOpeners = (line.match(/<\s*table\b[^>]*>/gi) || []).length;
    const tableClosers = (line.match(/<\s*\/\s*table\s*>/gi) || []).length;

    if (trOpeners || trClosers) {
      console.log(`Line ${i + 1}: tr open=${trOpeners}, close=${trClosers}, running total=${trOpen + trOpeners - trClosers}`);
    }
    if (tableOpeners || tableClosers) {
      console.log(`Line ${i + 1}: table open=${tableOpeners}, close=${tableClosers}`);
    }

    trOpen += trOpeners - trClosers;
    tableOpen += tableOpeners - tableClosers;
  }

  console.log(`\nFinal: tr open=${trOpen}, table open=${tableOpen}`);
}

main().catch(console.error);
