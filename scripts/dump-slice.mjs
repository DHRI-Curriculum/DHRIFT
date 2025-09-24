import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkFrontmatter from 'remark-frontmatter';
import sanitizerPkg from '../utils/sanitizer.mjs';
const { sanitizeBeforeParse, autoCloseInfoBlocks, autoCloseSecretBlocks, dropLeadingSliceArtifacts } = sanitizerPkg;

// Use shared sanitizer utilities
const sanitizeSource = (str) => sanitizeBeforeParse(str);

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
const filePath = path.isAbsolute(file) ? file : path.join(process.cwd(), file);
const base = fs.readFileSync(filePath, 'utf8');
const fm = matter(base);
// Match test-render pipeline: mask then sanitize, split, then restore and sanitize per-slice
function maskBlocks(src) {
  const codeEditorSegments = [];
  const secretSegments = [];
  const infoSegments = [];
  const keywordSegments = [];
  let masked = src.replace(/<CodeEditor\b([^>]*)>([\s\S]*?)<\/CodeEditor>/gi, (m, attrs, inner) => {
    const idx = codeEditorSegments.length;
    codeEditorSegments.push(inner);
    const hasData = /data-index\s*=/.test(attrs);
    const newAttrs = hasData ? attrs : `${attrs} data-index="${idx}"`;
    return `<dhrift-codeeditor${newAttrs}></dhrift-codeeditor>`;
  });
  masked = masked.replace(/<Secret\b([^>]*)>([\s\S]*?)<\/Secret>/gi, (m, attrs, inner) => {
    const idx = secretSegments.length;
    secretSegments.push(inner);
    const hasData = /data-index\s*=/.test(attrs);
    const newAttrs = hasData ? attrs : `${attrs} data-index="${idx}"`;
    return `<dhrift-secret${newAttrs}></dhrift-secret>`;
  });
  masked = masked.replace(/<Info\b[^>]*>([\s\S]*?)<\/Info>/gi, (m, inner) => {
    const idx = infoSegments.length; infoSegments.push(inner);
    return `<dhrift-info data-index="${idx}"></dhrift-info>`;
  });
  masked = masked.replace(/<Keywords\b([^>]*)>([\s\S]*?)<\/Keywords>/gi, (m, attrs, inner) => {
    const idx = keywordSegments.length;
    keywordSegments.push(inner);
    const hasData = /data-index\s*=/.test(attrs);
    const newAttrs = hasData ? attrs : `${attrs} data-index="${idx}"`;
    return `<dhrift-keywords${newAttrs}></dhrift-keywords>`;
  });
  masked = masked.replace(/<Info\b[^>]*>([^\n]*)$/gmi, (m, inner) => {
    const idx = infoSegments.length; infoSegments.push(inner);
    return `<dhrift-info data-index="${idx}"></dhrift-info>`;
  });
  return { masked, codeEditorSegments, secretSegments, infoSegments, keywordSegments };
}

function restoreBlocks(src, { codeEditorSegments, secretSegments, infoSegments, keywordSegments }) {
  let restored = src.replace(/<dhrift-codeeditor\b([^>]*)><\/dhrift-codeeditor>/gi, (m, attrs) => {
    const mIdx = /data-index\s*=\s*"?(\d+)"?/i.exec(attrs);
    const idx = mIdx ? parseInt(mIdx[1], 10) : -1;
    const inner = (idx >= 0 && codeEditorSegments[idx] != null) ? codeEditorSegments[idx] : '';
    return `<CodeEditor${attrs}>${inner}</CodeEditor>`;
  });
  restored = restored.replace(/<dhrift-secret\b([^>]*)><\/dhrift-secret>/gi, (m, attrs) => {
    const mIdx = /data-index\s*=\s*"?(\d+)"?/i.exec(attrs);
    const idx = mIdx ? parseInt(mIdx[1], 10) : -1;
    const inner = (idx >= 0 && secretSegments[idx] != null) ? secretSegments[idx] : '';
    return `<Secret${attrs}>${inner}</Secret>`;
  });
  restored = restored.replace(/<dhrift-info\b([^>]*)><\/dhrift-info>/gi, (m, attrs) => {
    const mIdx = /data-index\s*=\s*"?(\d+)"?/i.exec(attrs);
    const idx = mIdx ? parseInt(mIdx[1], 10) : -1;
    const inner = (idx >= 0 && infoSegments[idx] != null) ? infoSegments[idx] : '';
    return `<Info${attrs}>${inner}</Info>`;
  });
  restored = restored.replace(/<dhrift-keywords\b([^>]*)><\/dhrift-keywords>/gi, (m, attrs) => {
    const mIdx = /data-index\s*=\s*"?(\d+)"?/i.exec(attrs);
    const idx = mIdx ? parseInt(mIdx[1], 10) : -1;
    const inner = (idx >= 0 && keywordSegments[idx] != null) ? keywordSegments[idx] : '';
    return `<Keywords${attrs}>${inner}</Keywords>`;
  });
  return restored;
}

const preAuto = autoCloseSecretBlocks(autoCloseInfoBlocks(fm.content));
const { masked, codeEditorSegments, secretSegments, infoSegments, keywordSegments } = maskBlocks(preAuto);
const maskedSanitized = sanitizeSource(masked);
const slices = splitToSlices(maskedSanitized, { longPages: false });
const idx = page - 2; // convert to zero-based slice index
if (idx < 0 || idx >= slices.length) { console.error('bad page'); process.exit(1); }
// Simulate dynamic route restore + sanitize + boundary cleanup
const restored = restoreBlocks(slices[idx], { codeEditorSegments, secretSegments, infoSegments, keywordSegments });
let cleaned = dropLeadingSliceArtifacts(sanitizeSource(restored));
console.log(cleaned.split(/\r?\n/).map((l,i)=>String(i+1).padStart(3,' ')+': '+l).join('\n'));
