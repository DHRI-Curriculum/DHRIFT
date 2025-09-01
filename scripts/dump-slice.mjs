import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkFrontmatter from 'remark-frontmatter';

function autoCloseInfoBlocks(str) {
  const lines = str.split(/\r?\n/);
  let inFence = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!inFence && (line.startsWith('```') || line.startsWith('~~~'))) { inFence = true; continue; }
    if (inFence && (line.startsWith('```') || line.startsWith('~~~'))) { inFence = false; continue; }
    if (inFence) continue;
    if (/<!--\s*<Info\b/i.test(line)) continue;
    if (/<Info\b[^>]*>/.test(line)) {
      if (/<\/\s*Info\s*>/.test(line)) continue;
      let j = i + 1; let foundClose = false;
      while (j < lines.length) {
        const l2 = lines[j];
        if (!l2.trim()) break;
        if (!inFence && (l2.startsWith('```') || l2.startsWith('~~~'))) break;
        if (/<\/\s*Info\s*>/.test(l2)) { foundClose = true; break; }
        j++;
      }
      if (!foundClose) {
        const insertAt = j - 1 >= i ? j - 1 : i;
        lines[insertAt] = (lines[insertAt] || '') + '</Info>';
      }
    }
  }
  return lines.join('\n');
}

function autoCloseSecretBlocks(str) {
  const lines = str.split(/\r?\n/);
  let inFence = false;
  let openSince = -1;
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    if (!inFence && (line.startsWith('```') || line.startsWith('~~~'))) { inFence = true; continue; }
    if (inFence && (line.startsWith('```') || line.startsWith('~~~'))) { inFence = false; continue; }
    if (inFence) continue;
    if (/^\s*<\/\s*Secret\s*>\s*$/.test(line) && openSince === -1) { lines[i] = ''; continue; }
    if (/<Secret\b[^>]*>/.test(line)) {
      if (/<\/\s*Secret\s*>/.test(line)) continue;
      if (openSince === -1) openSince = i;
      continue;
    }
    if (openSince !== -1) {
      const isHeading = /^\s*#{1,6}\s+/.test(line);
      const isTagStart = /^\s*<\s*[A-Za-z]/.test(line);
      if ((!line.trim() || isHeading || isTagStart) && !/<\/\s*Secret\s*>/.test(line)) {
        let j = i - 1; while (j >= openSince && lines[j].trim() === '') j--;
        const at = j >= openSince ? j : openSince;
        lines[at] = (lines[at] || '') + '</Secret>';
        openSince = -1;
      }
    }
  }
  if (openSince !== -1) {
    lines[lines.length - 1] = (lines[lines.length - 1] || '') + '</Secret>';
  }
  return lines.join('\n');
}

function sanitizeSource(str) {
  let s = str || '';
  s = s.replace(/<br\s*>/gi, '<br />').replace(/<br\s*\/\s*>/gi, '<br />');
  s = s.replace(/<Download(\b[^>]*?)>(?!\s*<\s*\/\s*Download\s*>)/gi, '<Download$1></Download>');
  return s;
}

function splitToSlices(src, { longPages }) {
  const splitOnH2 = !longPages;
  const processor = unified().use(remarkParse).use(remarkGfm).use(remarkFrontmatter);
  const tree = processor.parse(src);
  const children = Array.isArray(tree.children) ? tree.children : [];
  const starts = [];
  for (let i=0;i<children.length;i++){
    const n = children[i];
    if (n?.type === 'heading' && (n.depth === 1 || (n.depth === 2 && splitOnH2))) starts.push(i);
  }
  const slices = [];
  for (let i=0;i<starts.length;i++){
    const s = starts[i];
    const e = (i+1<starts.length)?starts[i+1]:children.length;
    const startNode = children[s];
    const endNode = children[e-1];
    const startOff = startNode?.position?.start?.offset ?? 0;
    const endOff = endNode?.position?.end?.offset ?? src.length;
    slices.push(src.slice(startOff, endOff));
  }
  return slices;
}

const file = process.argv[2] || 'command-line.md';
const page = Number(process.argv[3] || 20); // 1-based including Frontmatter
const base = fs.readFileSync(path.join(process.cwd(), file), 'utf8');
const fm = matter(base);
const prepared = sanitizeSource(autoCloseSecretBlocks(autoCloseInfoBlocks(fm.content)));
const slices = splitToSlices(prepared, { longPages: false });
const idx = page - 2; // convert to zero-based slice index
if (idx < 0 || idx >= slices.length) { console.error('bad page'); process.exit(1); }
// Simulate dynamic route restore + sanitize + boundary cleanup
const restored = (()=>{
  // Reuse mask/restore from dynamic route; here we didn't keep segments, so just return slice
  return slices[idx];
})();
let cleaned = sanitizeSource(restored);
// Head cleanup: drop leading </Quiz> and '/>' prefix
{
  const arr = cleaned.split(/\r?\n/);
  for (let li=0; li<arr.length; li++){
    const l = arr[li];
    if (/^\s*$/.test(l)) continue;
    if (/^\s*<\s*\/\s*Quiz\s*>\s*$/.test(l)) { arr[li] = ''; continue; }
    if (/^\s*\/>/.test(l)) { arr[li] = l.replace(/^\s*\/>\s*/, ''); }
    break;
  }
  cleaned = arr.join('\n').replace(/^\s*\/>\s*$/gmi, '');
}
console.log(cleaned.split(/\r?\n/).map((l,i)=>String(i+1).padStart(3,' ')+': '+l).join('\n'));
