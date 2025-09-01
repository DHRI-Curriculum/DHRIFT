import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkMdx from 'remark-mdx';
import remarkGfm from 'remark-gfm';
import remarkFrontmatter from 'remark-frontmatter';
import remarkDeflist from 'remark-deflist';

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
    const idx = infoSegments.length; infoSegments.push(inner);
    return `<dhrift-info data-index="${idx}"></dhrift-info>`;
  });
  masked = masked.replace(/<Info\b[^>]*>([^\n]*)$/gmi, (m, inner) => {
    const idx = infoSegments.length; infoSegments.push(inner);
    return `<dhrift-info data-index="${idx}"></dhrift-info>`;
  });
  return { masked, codeEditorSegments, secretSegments, infoSegments };
}

function restoreBlocks(src, { codeEditorSegments, secretSegments, infoSegments }) {
  let restored = src.replace(/<CodeEditor\b([^>]*)><\/CodeEditor>/gi, (m, attrs) => {
    const mIdx = /data-index\s*=\s*"?(\d+)"?/i.exec(attrs);
    const idx = mIdx ? parseInt(mIdx[1], 10) : -1;
    const inner = (idx >= 0 && codeEditorSegments[idx] != null) ? codeEditorSegments[idx] : '';
    return `<CodeEditor${attrs}>${inner}</CodeEditor>`;
  });
  restored = restored.replace(/<Secret\b([^>]*)><\/Secret>/gi, (m, attrs) => {
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
  return restored;
}

function sanitizeSource(str) {
  let s = str || '';
  s = s.replace(/<br\s*>/gi, '<br />').replace(/<br\s*\/\s*>/gi, '<br />');
  s = s.replace(/<Download(\b[^>]*?)>(?!\s*<\s*\/\s*Download\s*>)/gi, '<Download$1></Download>');
  const stripStrayQuizClosers = (t) => { const lines=t.split(/\r?\n/); let depth=0; for(let i=0;i<lines.length;i++){ let line=lines[i]; const opens=(line.match(/<\s*Quiz\b[^>]*>/gi)||[]).length; line=line.replace(/<\s*\/\s*Quiz\s*>/gi,(m)=>depth>0?(depth--,m):''); depth+=opens; lines[i]=line } return lines.join('\n') };
  s = stripStrayQuizClosers(s);
  const normalizeQuizBlocks = (t)=>{ const lines=t.split(/\r?\n/); let inFence=false,openSince=-1; for(let i=0;i<lines.length;i++){ const line=lines[i]; if(!inFence&&(line.startsWith('```')||line.startsWith('~~~'))){ inFence=true; continue } if(inFence&&(line.startsWith('```')||line.startsWith('~~~'))){ inFence=false; continue } if(inFence) continue; if(openSince!==-1){ const isHeading=/^\s*#{1,6}\s+/.test(line); const isTag=/^\s*<\s*[A-Za-z]/.test(line); const isNewQuiz=/<Quiz\b[^>]*>/.test(line); if((isHeading||isTag)&&!isNewQuiz){ let j=i-1; while(j>=openSince&&lines[j].trim()==='') j--; const at=j>=openSince?j:openSince; lines[at]=(lines[at]||'')+'</Quiz>'; openSince=-1; } } if(/^\s*<\/\s*Quiz\s*>\s*$/.test(line)&&openSince===-1){ lines[i]=''; continue } if(/<Quiz\b[^>]*>/.test(line)){ if(/<\/\s*Quiz\s*>/.test(line)) continue; openSince=i; continue } if(!line.trim()&&openSince!==-1){ let j=i-1; while(j>=openSince&&lines[j].trim()==='') j--; const at=j>=openSince?j:openSince; lines[at]=(lines[at]||'')+'</Quiz>'; openSince=-1; continue } if(/<\/\s*Quiz\s*>/.test(line)) openSince=-1; } if(openSince!==-1){ lines[lines.length-1]=(lines[lines.length-1]||'')+'</Quiz>'; } return lines.join('\n') };
  s = normalizeQuizBlocks(s);
  const normKbd=(t)=>{ const lines=t.split(/\r?\n/); let inFence=false; for(let i=0;i<lines.length;i++){ let line=lines[i]; if(!inFence&&(line.startsWith('```')||line.startsWith('~~~'))){ inFence=true; lines[i]=line; continue } if(inFence&&(line.startsWith('```')||line.startsWith('~~~'))){ inFence=false; lines[i]=line; continue } if(inFence){ lines[i]=line; continue } line=line.replace(/<kbd>([^<\n]+?)(?=$|<|\s|[\.,:;!\?\)\]])/gi,'<kbd>$1</kbd>'); const openCount=(line.match(/<\s*kbd\b[^>]*>/gi)||[]).length; const closeCount=(line.match(/<\s*\/\s*kbd\s*>/gi)||[]).length; if(openCount>closeCount){ const missing=openCount-closeCount; line=line+Array(missing).fill('</kbd>').join('') } let depth=0; line=line.replace(/<\s*kbd\b[^>]*>/gi,(m)=>{depth++; return m}).replace(/<\s*\/\s*kbd\s*>/gi,(m)=>depth>0?(depth--,m):''); lines[i]=line } return lines.join('\n') };
  s = normKbd(s);
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
  s = stripStrayClosers(s, ['Info','Secret','Keywords','CodeEditor','Download','Jupyter','PythonREPL','Terminal','Link','dhrift-info','dhrift-secret','dhrift-keywords','dhrift-codeeditor','p','li','ul','ol','div','span','code','pre','em','strong','h1','h2','h3','h4','h5','h6']);
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

async function main() {
  // Usage: node scripts/test-render-slices.mjs [file] [--max-pages=N] [--mdx] [--no-mdx] [--stop-on-error]
  const args = process.argv.slice(2);
  let file = 'javascript.md';
  let maxPages = 30; // default small cap to avoid timeouts
  let doMdx = false; // default off for speed; enable with --mdx
  let stopOnError = false;
  for (const a of args) {
    if (!a.startsWith('--') && !file) file = a;
    else if (!a.startsWith('--') && file === 'javascript.md') file = a; // first positional wins
    else if (a.startsWith('--max-pages=')) {
      const n = Number(a.split('=')[1]);
      if (Number.isFinite(n) && n > 0) maxPages = Math.min(n, 500);
    } else if (a === '--mdx') doMdx = true;
    else if (a === '--no-mdx') doMdx = false;
    else if (a === '--stop-on-error') stopOnError = true;
  }
  const raw = fs.readFileSync(path.join(process.cwd(), file), 'utf8');
  const fm = matter(raw);
  const longPages = fm.data?.long_pages === true || fm.data?.long_pages === 'true';
  const prepared = sanitizeSource(autoCloseSecretBlocks(autoCloseInfoBlocks(fm.content)));
  const { masked, codeEditorSegments, secretSegments, infoSegments } = maskBlocks(prepared);
  const slices = splitToSlices(masked, { longPages });
  const results = [];
  const limit = Math.min(slices.length, maxPages);
  for (let i=0;i<limit;i++){
    const restored = restoreBlocks(slices[i], { codeEditorSegments, secretSegments, infoSegments });
    let cleaned = sanitizeSource(restored);
    // Drop any leading stray Quiz closers at slice start
    {
      const arr = cleaned.split(/\r?\n/);
      for (let li=0; li<arr.length; li++) {
        const l = arr[li];
        if (/^\s*$/.test(l)) continue;
        if (/^\s*<\s*\/\s*Quiz\s*>\s*$/.test(l)) { arr[li] = ''; continue; }
        if (/^\s*\/>/.test(l)) { arr[li] = l.replace(/^\s*\/>\s*/, ''); }
        break;
      }
      cleaned = arr.join('\n').replace(/^\s*\/>\s*$/gmi, '');
    }
    // Strip stray closing tags for Secret and placeholders per-slice
    const stripStrayClosers = (t, tagNames) => {
      const reOpen = (nm) => new RegExp(`<\\s*${nm}\\b[^>]*>`, 'gi');
      const reClose = (nm) => new RegExp(`<\\s*/\\s*${nm}\\s*>`, 'gi');
      const depths = Object.fromEntries(tagNames.map(n => [n.toLowerCase(), 0]));
      const lines = t.split(/\r?\n/);
      for (let i=0;i<lines.length;i++){
        let line = lines[i];
        tagNames.forEach((nm)=>{ line = line.replace(reClose(nm), (m) => { const key=nm.toLowerCase(); if (depths[key] > 0) { depths[key]--; return m; } return ''; }) });
        tagNames.forEach((nm)=>{ const key=nm.toLowerCase(); const opens=(line.match(reOpen(nm))||[]).length; depths[key]+=opens; });
        lines[i]=line;
      }
      return lines.join('\n');
    };
    cleaned = stripStrayClosers(cleaned, ['dhrift-secret','Secret','dhrift-info','dhrift-codeeditor']);
    // Convert balanced Secret to self-closing placeholder like ConvertMarkdown
    cleaned = cleaned.replace(/<Secret\b([^>]*)>([\s\S]*?)<\/Secret>/gi, (m, attrs, inner) => `<dhrift-secret data-index="0"></dhrift-secret>`);
    if (doMdx) {
      try {
        // Try MDX parse like ConvertMarkdown (slow path)
        unified().use(remarkParse, { fragment: true }).use(remarkMdx).use(remarkGfm).use(remarkFrontmatter).use(remarkDeflist).parse(cleaned);
        results.push({ page: i+2, ok: true });
      } catch (e) {
        const err = { page: i+2, ok: false, reason: e?.reason || e?.message || String(e) };
        results.push(err);
        if (stopOnError) break;
      }
    } else {
      // Fast path: look for common problematic patterns without MDX parse
      if (/^\s*<\s*\/\s*Quiz\s*>\s*$/m.test(cleaned)) {
        results.push({ page: i+2, ok: false, reason: 'Stray </Quiz> at slice start' });
        if (stopOnError) break;
      } else if (/^\s*\/>\s*$/m.test(cleaned)) {
        results.push({ page: i+2, ok: false, reason: 'Dangling /> line' });
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
