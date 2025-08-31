import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkFrontmatter from 'remark-frontmatter';
import remarkDeflist from 'remark-deflist';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';

function preprocess(content) {
  let safe = (content || '')
    .replace(/<\s*Link(\s|>)/g, '<dhrift-link$1')
    .replace(/<\/\s*Link\s*>/g, '</dhrift-link>');

  // Fix self-closing custom tags
  safe = safe
    .replace(/<PythonREPL\s*\/>/g, '<PythonREPL></PythonREPL>')
    .replace(/<Terminal\s*\/>/g, '<Terminal></Terminal>')
    .replace(/<Jupyter([^>]*)\/>/g, '<Jupyter$1></Jupyter>')
    .replace(/<Download([^>]*)\/>/g, '<Download$1></Download>');

  // Escape CodeEditor inner content to avoid headings inside
  const escapeHtml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  safe = safe.replace(/<CodeEditor\b([^>]*)>([\s\S]*?)<\/CodeEditor>/gi, (m, attrs, inner) => {
    const escaped = escapeHtml(inner);
    return `<CodeEditor${attrs}>${escaped}</CodeEditor>`;
  });

  // Placeholder Secrets
  const secretSegments = [];
  safe = safe.replace(/<Secret\b[^>]*>([\s\S]*?)<\/Secret>/gi, (m, inner) => {
    const idx = secretSegments.length;
    secretSegments.push(inner);
    return `<dhrift-secret data-index="${idx}"></dhrift-secret>`;
  });

  return { safe, secretSegments };
}

function printTree(node, depth = 0) {
  if (!node) return;
  const ind = '  '.repeat(depth);
  if (node.type === 'element') {
    console.log(`${ind}<${node.tagName}>`);
    (node.children || []).forEach(c => printTree(c, depth + 1));
  } else if (node.type === 'text') {
    const text = (node.value || '').trim();
    if (text) console.log(`${ind}"${text.slice(0, 40)}${text.length > 40 ? '…' : ''}"`);
  }
}

function getText(node) {
  if (!node) return '';
  if (node.type === 'text') return node.value || '';
  if (node.children && node.children.length) return node.children.map(getText).join('');
  return '';
}

function getHeadingTag(node) {
  if (!node || node.type !== 'element') return null;
  const tag = node.tagName;
  if (tag === 'h1' || tag === 'h2') return tag;
  if (tag === 'code' || tag === 'pre') return null;
  if (['codeeditor', 'pythonrepl', 'terminal', 'download', 'dhrift-secret', 'info', 'jupyter', 'quiz', 'keywords', 'dhrift-link'].includes(tag)) return null;
  // Recurse into direct children
  const kids = node.children || [];
  for (const k of kids) {
    const inner = getHeadingTag(k);
    if (inner) return inner;
  }
  return null;
}

async function main() {
  const argPath = process.argv[2];
  const filePath = argPath
    ? path.isAbsolute(argPath) ? argPath : path.join(process.cwd(), argPath)
    : path.join(process.cwd(), 'EXAMPLE-WORKSHOP-FOR-TESTING.md');
  console.log('Using file:', filePath);
  const raw = fs.readFileSync(filePath, 'utf8');
  const fm = matter(raw);
  const longPages = fm.data?.long_pages === true || fm.data?.long_pages === 'true';
  const splitOnH2 = !longPages; // matches app logic
  const { safe } = preprocess(fm.content);

  const processor = unified()
    .use(remarkParse, { fragment: true })
    .use(remarkGfm)
    .use(remarkFrontmatter)
    .use(remarkDeflist)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw);

  const mdast = processor.parse(safe);
  // Count mdast H1 headings
  let mdH1 = 0;
  function walk(node) {
    if (!node) return;
    if (node.type === 'heading' && node.depth === 1) mdH1++;
    const kids = node.children || [];
    kids.forEach(walk);
  }
  walk(mdast);
  console.log('mdast H1 count:', mdH1);
  const hast = await processor.run(mdast);

  // Also try without Secret placeholder to compare
  const processor2 = unified()
    .use(remarkParse, { fragment: true })
    .use(remarkGfm)
    .use(remarkFrontmatter)
    .use(remarkDeflist)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw);
  const noSecretSafe = (fm.content || '')
    .replace(/<\s*Link(\s|>)/g, '<dhrift-link$1')
    .replace(/<\/\s*Link\s*>/g, '</dhrift-link>')
    .replace(/<PythonREPL\s*\/>/g, '<PythonREPL></PythonREPL>')
    .replace(/<Terminal\s*\/>/g, '<Terminal></Terminal>')
    .replace(/<Jupyter([^>]*)\/>/g, '<Jupyter$1></Jupyter>')
    .replace(/<Download([^>]*)\/>/g, '<Download$1></Download>')
    .replace(/<CodeEditor\b([^>]*)>([\s\S]*?)<\/CodeEditor>/gi, (m, attrs, inner) => {
      const escapeHtml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      return `<CodeEditor${attrs}>${escapeHtml(inner)}</CodeEditor>`;
    });
  const mdast2 = processor2.parse(noSecretSafe);
  const hast2 = await processor2.run(mdast2);

  const top = (hast.children || []).filter(Boolean);
  const pages = [];
  let current = [];

  for (const n of top) {
    if (n.type !== 'element') { current.push(n); continue; }
    const tag = getHeadingTag(n);
    if (tag === 'h1') {
      if (current.length) pages.push(current), current = [];
      current.push(n);
    } else if (tag === 'h2' && splitOnH2) {
      if (current.length) pages.push(current), current = [];
      current.push(n);
    } else {
      current.push(n);
    }
  }
  if (current.length) pages.push(current);

  console.log('long_pages:', longPages, 'splitOnH2:', splitOnH2);
  console.log('Total top-level nodes:', top.length);
  console.log('Computed pages:', pages.length);
  // Debug: list all H1 headings we see
  const allH1 = top
    .filter(n => n.type === 'element' && n.tagName === 'h1')
    .map(n => getText(n).slice(0, 120));
  console.log('All H1s at top level:', allH1.length);
  allH1.forEach((t, i) => console.log(`  H1[${i+1}]: ${t}`));
  pages.forEach((p, i) => {
    const firstHeading = p.find(x => x.type === 'element' && (x.tagName === 'h1' || x.tagName === 'h2'))
      || p.find(x => getHeadingTag(x));
    const headingText = firstHeading ? getText(firstHeading) : '(no heading)';
    console.log(`Page ${i + 1}: ${headingText.slice(0, 80)}`);
  });

  // Compare without Secret placeholder
  const top2 = (hast2.children || []).filter(Boolean);
  const pages2 = [];
  let curr2 = [];
  for (const n of top2) {
    if (n.type !== 'element') { curr2.push(n); continue; }
    const tag = getHeadingTag(n);
    if (tag === 'h1') { if (curr2.length) pages2.push(curr2), curr2 = []; curr2.push(n); }
    else if (tag === 'h2' && splitOnH2) { if (curr2.length) pages2.push(curr2), curr2 = []; curr2.push(n); }
    else { curr2.push(n); }
  }
  if (curr2.length) pages2.push(curr2);
  console.log('Computed pages (no secret placeholder):', pages2.length);
  pages2.forEach((p, i) => {
    const firstHeading = p.find(x => x.type === 'element' && (x.tagName === 'h1' || x.tagName === 'h2'))
      || p.find(x => getHeadingTag(x));
    const headingText = firstHeading ? getText(firstHeading) : '(no heading)';
    console.log(`  P2 Page ${i + 1}: ${headingText.slice(0, 80)}`);
  });
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
