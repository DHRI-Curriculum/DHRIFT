import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkMdx from 'remark-mdx';
import remarkGfm from 'remark-gfm';
import remarkFrontmatter from 'remark-frontmatter';
import remarkDeflist from 'remark-deflist';
import sanitizerPkg from './sanitizer.mjs';
const { sanitizeBeforeParse, dropLeadingSliceArtifacts, escapeCurlyForMDX } = sanitizerPkg;

// Shared: replace custom components with placeholders to reduce MDX parse surface
export function maskBlocks(src) {
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
  // Handle dangling Info opener at file end
  masked = masked.replace(/<Info\b[^>]*>([^\n]*)$/gmi, (m, inner) => {
    const idx = infoSegments.length; infoSegments.push(inner);
    return `<dhrift-info data-index="${idx}"></dhrift-info>`;
  });
  return { masked, codeEditorSegments, secretSegments, infoSegments, keywordSegments };
}

export function restoreBlocks(src, { codeEditorSegments = [], secretSegments = [], infoSegments = [], keywordSegments = [] }) {
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

export function splitToSlices(src, { longPages }) {
  const splitOnH2 = !longPages;
  const processor = unified().use(remarkParse).use(remarkGfm).use(remarkFrontmatter);
  const tree = processor.parse(src);
  const children = Array.isArray(tree.children) ? tree.children : [];
  const starts = [];
  for (let i = 0; i < children.length; i++) {
    const n = children[i];
    if (n?.type === 'heading' && (n.depth === 1 || (n.depth === 2 && splitOnH2))) starts.push(i);
  }
  const slices = [];
  for (let i = 0; i < starts.length; i++) {
    const s = starts[i];
    const e = (i + 1 < starts.length) ? starts[i + 1] : children.length;
    const startNode = children[s];
    const endNode = children[e - 1];
    const startOff = startNode?.position?.start?.offset ?? 0;
    const endOff = endNode?.position?.end?.offset ?? src.length;
    slices.push(src.slice(startOff, endOff));
  }
  return slices;
}

export function mdxParseMaskedSliceOrThrow(maskedSlice) {
  const cleaned = dropLeadingSliceArtifacts(sanitizeBeforeParse(maskedSlice));
  const mdxReady = escapeCurlyForMDX(cleaned);
  unified()
    .use(remarkParse, { fragment: true })
    .use(remarkMdx)
    .use(remarkGfm)
    .use(remarkFrontmatter)
    .use(remarkDeflist)
    .parse(mdxReady);
}

export default {
  maskBlocks,
  restoreBlocks,
  splitToSlices,
  mdxParseMaskedSliceOrThrow,
};
