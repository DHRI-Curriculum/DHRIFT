import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkMdx from 'remark-mdx';
import remarkGfm from 'remark-gfm';
import remarkFrontmatter from 'remark-frontmatter';
import remarkDeflist from 'remark-deflist';

// General sanitizer consistent with app path
function sanitizeSource(str) {
  let s = (str || '')
    .replace(/<\s*Link(\s|>)/g, '<dhrift-link$1')
    .replace(/<\/\s*Link\s*>/g, '</dhrift-link>');
  // Normalize voids
  s = s.replace(/<br\s*>/gi, '<br />').replace(/<br\s*\/\s*>/gi, '<br />');
  // Auto-close Download
  s = s.replace(/<Download(\b[^>]*?)>(?!\s*<\s*\/\s*Download\s*>)/gi, '<Download$1></Download>');
  // Quiz: strip stray closers
  const stripStrayQuizClosers = (t) => { const lines=t.split(/\r?\n/); let depth=0; for(let i=0;i<lines.length;i++){ let line=lines[i]; const opens=(line.match(/<\s*Quiz\b[^>]*>/gi)||[]).length; line=line.replace(/<\s*\/\s*Quiz\s*>/gi,(m)=>depth>0?(depth--,m):''); depth+=opens; lines[i]=line } return lines.join('\n') };
  s = stripStrayQuizClosers(s);
  // Quiz: auto-close at block boundaries
  const normalizeQuizBlocks = (t)=>{ const lines=t.split(/\r?\n/); let inFence=false,openSince=-1; for(let i=0;i<lines.length;i++){ const line=lines[i]; if(!inFence&&(line.startsWith('```')||line.startsWith('~~~'))){ inFence=true; continue } if(inFence&&(line.startsWith('```')||line.startsWith('~~~'))){ inFence=false; continue } if(inFence) continue; if(openSince!==-1){ const isHeading=/^\s*#{1,6}\s+/.test(line); const isTag=/^\s*<\s*[A-Za-z]/.test(line); const isNewQuiz=/<Quiz\b[^>]*>/.test(line); if((isHeading||isTag)&&!isNewQuiz){ let j=i-1; while(j>=openSince&&lines[j].trim()==='') j--; const at=j>=openSince?j:openSince; lines[at]=(lines[at]||'')+'</Quiz>'; openSince=-1; } } if(/^\s*<\/\s*Quiz\s*>\s*$/.test(line)&&openSince===-1){ lines[i]=''; continue } if(/<Quiz\b[^>]*>/.test(line)){ if(/<\/\s*Quiz\s*>/.test(line)) continue; openSince=i; continue } if(!line.trim()&&openSince!==-1){ let j=i-1; while(j>=openSince&&lines[j].trim()==='') j--; const at=j>=openSince?j:openSince; lines[at]=(lines[at]||'')+'</Quiz>'; openSince=-1; continue } if(/<\/\s*Quiz\s*>/.test(line)) openSince=-1; } if(openSince!==-1){ lines[lines.length-1]=(lines[lines.length-1]||'')+'</Quiz>'; } return lines.join('\n') };
  // Note: minor typo fixed below
  s = s.replace(/<Quiz\b/,'<Quiz'); // no-op placeholder
  // Inline kbd
  const normKbd=(t)=>{ const lines=t.split(/\r?\n/); let inFence=false; for(let i=0;i<lines.length;i++){ let line=lines[i]; if(!inFence&&(line.startsWith('```')||line.startsWith('~~~'))){ inFence=true; lines[i]=line; continue } if(inFence&&(line.startsWith('```')||line.startsWith('~~~'))){ inFence=false; lines[i]=line; continue } if(inFence){ lines[i]=line; continue } line=line.replace(/<kbd>([^<\n]+?)(?=$|<|\s|[\.,:;!\?\)\]])/gi,'<kbd>$1</kbd>'); const openCount=(line.match(/<\s*kbd\b[^>]*>/gi)||[]).length; const closeCount=(line.match(/<\s*\/\s*kbd\s*>/gi)||[]).length; if(openCount>closeCount){ const missing=openCount-closeCount; line=line+Array(missing).fill('</kbd>').join('') } let depth=0; line=line.replace(/<\s*kbd\b[^>]*>/gi,(m)=>{depth++; return m}).replace(/<\s*\/\s*kbd\s*>/gi,(m)=>depth>0?(depth--,m):''); lines[i]=line } return lines.join('\n') };
  s = normKbd(s);
  // Strip stray closers for known tags
  const stripStrayClosers = (t, tagNames) => {
    const reOpen = (nm) => new RegExp(`<\\s*${nm}\\b[^>]*>`, 'gi');
    const reClose = (nm) => new RegExp(`<\\s*/\\s*${nm}\\s*>`, 'gi');
    const depths = Object.fromEntries(tagNames.map(n => [n.toLowerCase(), 0]));
    const lines = t.split(/\r?\n/);
    for (let i=0;i<lines.length;i++){
      let line = lines[i];
      tagNames.forEach((nm)=>{ line = line.replace(reClose(nm), (m) => { const key=nm.toLowerCase(); if (depths[key] > 0) { depths[key]--; return m; } return ''; }) })
      tagNames.forEach((nm)=>{ const key=nm.toLowerCase(); const opens=(line.match(reOpen(nm))||[]).length; depths[key]+=opens; })
      lines[i]=line;
    }
    return lines.join('\n');
  }
  s = stripStrayClosers(s, ['Info','Secret','Keywords','Download','CodeEditor','Jupyter','PythonREPL','Terminal','Link','dhrift-info','dhrift-secret','dhrift-keywords','p','li','ul','ol','div','span','code','pre','em','strong','h1','h2','h3','h4','h5','h6']);
  return s;
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

// Mask blocks similarly to the app's dynamic route before heading parse
function maskBlocks(src) {
  const codeEditorSegments = [];
  const secretSegments = [];
  const infoSegments = [];
  let masked = src.replace(/<CodeEditor\b([^>]*)>([\s\S]*?)<\/CodeEditor>/gi, (m, attrs, inner) => {
    const idx = codeEditorSegments.length;
    codeEditorSegments.push(inner);
    const hasData = /data-index\s*=/.test(attrs);
    const newAttrs = hasData ? attrs : `${attrs} data-index="${idx}"`;
    return `<CodeEditor${newAttrs}></CodeEditor>`;
  });
  masked = masked.replace(/<Secret\b([^>]*)>([\s\S]*?)<\/Secret>/gi, (m, attrs, inner) => {
    const idx = secretSegments.length;
    secretSegments.push(inner);
    const hasData = /data-index\s*=/.test(attrs);
    const newAttrs = hasData ? attrs : `${attrs} data-index="${idx}"`;
    return `<Secret${newAttrs}></Secret>`;
  });
  masked = masked.replace(/<Info\b[^>]*>([\s\S]*?)<\/Info>/gi, (m, inner) => {
    const idx = infoSegments.length;
    infoSegments.push(inner);
    return `<dhrift-info data-index="${idx}"></dhrift-info>`;
  });
  masked = masked.replace(/<Info\b[^>]*>([^\n]*)$/gmi, (m, inner) => {
    const idx = infoSegments.length;
    infoSegments.push(inner);
    return `<dhrift-info data-index="${idx}"></dhrift-info>`;
  });
  return masked;
}

function buildProcessor({ mdx = true } = {}) {
  const p = unified()
    .use(remarkParse, { fragment: true })
    .use(remarkGfm)
    .use(remarkFrontmatter)
    .use(remarkDeflist);
  if (mdx) p.use(remarkMdx);
  return p;
}

function extractPages(children, { splitOnH2 }) {
  const pageStartIdx = [];
  for (let i = 0; i < children.length; i++) {
    const n = children[i];
    if (n.type === 'heading' && (n.depth === 1 || (n.depth === 2 && splitOnH2))) pageStartIdx.push(i);
  }
  const pages = [];
  for (let i = 0; i < pageStartIdx.length; i++) {
    const start = pageStartIdx[i];
    const end = (i + 1 < pageStartIdx.length) ? pageStartIdx[i + 1] : children.length;
    pages.push(children.slice(start, end));
  }
  return pages;
}

function headingTextFromNodes(nodes) {
  if (!nodes || !nodes.length) return '(no heading)';
  const h = nodes.find(n => n.type === 'heading');
  if (h) return getText(h).trim() || '(no heading)';
  const el = nodes.find(x => x.type === 'element' && (x.tagName === 'h1' || x.tagName === 'h2')) || nodes.find(getHeadingTag);
  if (el) return getText(el).trim() || '(no heading)';
  return '(no heading)';
}

async function main() {
  // Simple arg parse: [--summary] [--json] [--max-lines=N] [--list] [--verbose|-v] [file]
  const args = process.argv.slice(2);
  const flags = { verbose: false, list: false, summary: false, json: false, maxLines: 50 };
  const paths = [];
  for (const a of args) {
    if (a === '--verbose' || a === '-v') flags.verbose = true;
    else if (a === '--list') flags.list = true;
    else if (a === '--summary') flags.summary = true;
    else if (a === '--json') flags.json = true;
    else if (a.startsWith('--max-lines')) {
      const [, val] = a.split('=');
      const n = Number(val);
      if (Number.isFinite(n) && n > 0) flags.maxLines = Math.min(n, 200);
    }
    else if (a.startsWith('-')) {
      // ignore unknown flags silently to keep script resilient
    } else {
      paths.push(a);
    }
  }

  const argPath = paths[0];
  const filePath = argPath
    ? (path.isAbsolute(argPath) ? argPath : path.join(process.cwd(), argPath))
    : path.join(process.cwd(), 'EXAMPLE-WORKSHOP-FOR-TESTING.md');
  if (flags.verbose) console.log('Using file:', filePath);
  const raw = fs.readFileSync(filePath, 'utf8');
  const fm = matter(raw);
  const longPages = fm.data?.long_pages === true || fm.data?.long_pages === 'true';
  const splitOnH2 = !longPages; // matches app logic
  // Preprocess ref was removed; use local sanitizer
  const safe = sanitizeSource(maskBlocks(fm.content));

  // For splitting, match the app: use Markdown-only AST for headings
  let mdast;
  let usedFallback = true; // we intentionally skip MDX here
  try {
    mdast = buildProcessor({ mdx: false }).parse(safe);
  } catch (e2) {
    const where = e2 && e2.line != null && e2.column != null ? ` (at ${e2.line}:${e2.column})` : '';
    const msg = e2?.reason || e2?.message || String(e2);
    if (flags.json) {
      console.log(JSON.stringify({ error: msg, where: where.trim(), file: path.basename(filePath) }));
    } else if (flags.summary) {
      console.log(`error${where?':'+where:''} ${msg}`);
    } else {
      console.error(`parse_error:${where} ${msg}`);
    }
    process.exit(1);
  }
  // Count mdast H1 headings (top-level)
  const top = Array.isArray(mdast.children) ? mdast.children : [];
  const mdH1 = top.filter(n => n.type === 'heading' && n.depth === 1).length;
  if (flags.verbose) console.log('mdast H1 count:', mdH1);

  // Build pages from mdast top-level children
  const children = Array.isArray(mdast.children) ? mdast.children : [];
  const pages = extractPages(children, { splitOnH2 });

  if (flags.verbose) {
    console.log('long_pages:', longPages, 'splitOnH2:', splitOnH2, 'fallback:', usedFallback);
    console.log('Total top-level nodes:', top.length);
    console.log('Computed pages:', pages.length);
  }
  // Debug: list all H1 headings we see
  if (flags.verbose || flags.list) {
    const allH1 = top
      .filter(n => n.type === 'heading' && n.depth === 1)
      .map(n => getText(n).slice(0, 120));
    if (flags.verbose) {
      console.log('All H1s at top level:', allH1.length);
      allH1.forEach((t, i) => console.log(`  H1[${i+1}]: ${t}`));
    }
    const prefixed = [{ title: 'Frontmatter' }, ...pages.map(nodes => ({ title: headingTextFromNodes(nodes) }))];
    const max = Math.max(0, flags.maxLines);
    const count = Math.min(prefixed.length, max);
    for (let i = 0; i < count; i++) {
      const title = String(prefixed[i].title || '(no heading)').slice(0, 80);
      console.log(`Page ${i + 1}: ${title}`);
    }
    if (prefixed.length > count) {
      console.log(`… (${prefixed.length - count} more)`);
    }
  }

  // Always print a concise summary at the end when not verbose
  if (flags.json) {
    const base = path.basename(filePath);
    console.log(JSON.stringify({ pages: pages.length + 1, h1: mdH1, long_pages: !!longPages, splitOnH2: !!splitOnH2, fallback: usedFallback, file: base }));
  } else if (flags.summary || (!flags.verbose && !flags.list)) {
    const base = path.basename(filePath);
    console.log(`pages=${pages.length + 1} h1=${mdH1} long_pages=${longPages} splitOnH2=${splitOnH2} fallback=${usedFallback} file=${base}`);
  }
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
