// Shared sanitizer utilities for Markdown/MDX preprocessing and page-slice hygiene
// All functions are pure string transforms; callers compose them as needed.

const COMPONENT_TAGS = [
  'Info','Secret','Keywords','CodeEditor','Download','Jupyter','PythonREPL','Terminal','Link','Quiz'
];
const PLACEHOLDER_TAGS = [
  'dhrift-info','dhrift-secret','dhrift-keywords','dhrift-codeeditor'
];
const COMMON_HTML_TAGS = [
  'p','li','ul','ol','div','span','code','pre','em','strong','h1','h2','h3','h4','h5','h6','table','thead','tbody','tr','td','th','blockquote','hr','br','sup','sub','kbd','input','meta','img','a'
];

export const defaultStrayCloserTags = [
  ...COMPONENT_TAGS,
  ...PLACEHOLDER_TAGS,
  ...COMMON_HTML_TAGS,
];

export function normalizeVoids(str) {
  return (str || '')
    .replace(/<br\s*>/gi, '<br />')
    .replace(/<br\s*\/\s*>/gi, '<br />');
}

function isFenceLine(line) {
  const t = String(line || '').replace(/^\s+/, '');
  return t.startsWith('```') || t.startsWith('~~~');
}

// Escape a leading '>' that would start a Markdown blockquote; avoids accidental
// blockquotes inside JSX components like <Quiz> options. Leaves valid HTML tags intact.
export function escapeLeadingBlockquote(str) {
  const lines = String(str || '').split(/\r?\n/);
  let inFence = false;
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    if (isFenceLine(line)) { inFence = !inFence; continue; }
    if (inFence) continue;
    const m = /^\s*>\s*(?![A-Za-z/])/.exec(line);
    if (m) {
      const idx = line.indexOf('>');
      lines[i] = line.slice(0, idx) + '&gt;' + line.slice(idx + 1);
    }
  }
  return lines.join('\n');
}

export function ensureDownloadClosed(str) {
  return (str || '').replace(/<Download(\b[^>]*?)>(?!\s*<\s*\/\s*Download\s*>)/gi, '<Download$1></Download>');
}

export function stripStrayQuizClosers(str) {
  const lines = (str || '').split(/\r?\n/);
  let depth = 0;
  let inFence = false;
  let inMdxComment = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (isFenceLine(line)) { inFence = !inFence; lines[i] = line; continue; }
    if (inFence) { lines[i] = line; continue; }
    let j = 0; let out = '';
    while (j < line.length) {
      if (inMdxComment) {
        const endIdx = line.indexOf('*/}', j);
        if (endIdx === -1) { out += line.slice(j); j = line.length; break; }
        out += line.slice(j, endIdx + 3);
        j = endIdx + 3; inMdxComment = false; continue;
      }
      if (line.slice(j, j + 3) === '{/*') { out += '{/*'; j += 3; inMdxComment = true; continue; }
      if (line[j] === '<') {
        const closeM = /^<\s*\/\s*Quiz\s*>/i.exec(line.slice(j));
        if (closeM) {
          if (depth > 0) { out += closeM[0]; depth--; }
          j += closeM[0].length; continue;
        }
        const openM = /^<\s*Quiz\b[^>]*>/i.exec(line.slice(j));
        if (openM) {
          out += openM[0];
          depth++;
          j += openM[0].length; continue;
        }
      }
      out += line[j]; j++;
    }
    lines[i] = out;
  }
  return lines.join('\n');
}

export function normalizeQuizBlocks(str) {
  const lines = (str || '').split(/\r?\n/);
  let inFence = false, openSince = -1;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (isFenceLine(line)) { inFence = !inFence; continue; }
    if (inFence) continue;
    if (openSince !== -1) {
      const isHeading = /^\s*#{1,6}\s+/.test(line);
      const isTag = /^\s*<\s*[A-Za-z]/.test(line);
      const isNewQuiz = /<Quiz\b[^>]*>/.test(line);
      if ((isHeading || isTag) && !isNewQuiz) {
        let j = i - 1; while (j >= openSince && lines[j].trim() === '') j--;
        const at = j >= openSince ? j : openSince;
        lines[at] = (lines[at] || '') + '</Quiz>';
        openSince = -1;
      }
    }
    if (/^\s*<\/\s*Quiz\s*>\s*$/.test(line) && openSince === -1) { lines[i] = ''; continue; }
    if (/<Quiz\b[^>]*>/.test(line)) { if (/<\/\s*Quiz\s*>/.test(line)) continue; openSince = i; continue; }
    if (!line.trim() && openSince !== -1) {
      let j = i - 1; while (j >= openSince && lines[j].trim() === '') j--;
      const at = j >= openSince ? j : openSince;
      lines[at] = (lines[at] || '') + '</Quiz>';
      openSince = -1; continue;
    }
    if (/<\/\s*Quiz\s*>/.test(line)) openSince = -1;
  }
  if (openSince !== -1) {
    lines[lines.length - 1] = (lines[lines.length - 1] || '') + '</Quiz>';
  }
  return lines.join('\n');
}

export function normalizeKbd(str) {
  const lines = (str || '').split(/\r?\n/);
  let inFence = false;
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    if (isFenceLine(line)) { inFence = !inFence; lines[i] = line; continue; }
    if (inFence) { lines[i] = line; continue; }
    // Balance per-line: append missing </kbd> if more openers than closers
    const openCount = (line.match(/<\s*kbd\b[^>]*>/gi) || []).length;
    const closeCount = (line.match(/<\s*\/\s*kbd\s*>/gi) || []).length;
    if (openCount > closeCount) {
      const missing = openCount - closeCount;
      line = line + Array(missing).fill('</kbd>').join('');
    }
    // Remove stray </kbd> that appear before any opener on the same line
    let depth = 0;
    line = line.replace(/<\s*kbd\b[^>]*>/gi, (m) => { depth++; return m; })
               .replace(/<\s*\/\s*kbd\s*>/gi, (m) => depth > 0 ? (depth--, m) : '');
    lines[i] = line;
  }
  return lines.join('\n');
}

function balanceKbdGlobally(str) {
  const lines = String(str || '').split(/\r?\n/);
  let inFence = false;
  for (let li = 0; li < lines.length; li++) {
    const line = lines[li];
    if (!inFence && (line.startsWith('```') || line.startsWith('~~~'))) { inFence = true; continue; }
    if (inFence && (line.startsWith('```') || line.startsWith('~~~'))) { inFence = false; continue; }
  }
  // Simple global depth scan ignoring code fences by temporarily removing fence blocks
  let s = lines.join('\n');
  // Remove duplicate consecutive </kbd>
  s = s.replace(/(<\s*\/\s*kbd\s*>\s*){2,}/gi, '</kbd>');
  let depth = 0;
  s = s.replace(/<\/?\s*kbd\s*>/gi, (m) => {
    if (/^<\s*\//.test(m)) {
      if (depth > 0) { depth--; return m; }
      return '';
    } else {
      depth++; return m;
    }
  });
  if (depth > 0) {
    s += Array(depth).fill('</kbd>').join('');
  }
  return s;
}

export function stripStrayClosers(str, tagNames = defaultStrayCloserTags) {
  const depths = Object.fromEntries(tagNames.map(n => [n.toLowerCase(), 0]));
  const tagAlt = tagNames.join('|').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const tokenRe = new RegExp(`<\\s*(\\/)?\\s*(${tagAlt})\\b[^>]*?>`, 'gi');
  const lines = (str || '').split(/\r?\n/);
  let inFence = false;
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    if (!inFence && (line.startsWith('```') || line.startsWith('~~~'))) { inFence = true; lines[i] = line; continue; }
    if (inFence && (line.startsWith('```') || line.startsWith('~~~'))) { inFence = false; lines[i] = line; continue; }
    if (inFence) { lines[i] = line; continue; }
    let out = '';
    let last = 0;
    tokenRe.lastIndex = 0;
    let m;
    while ((m = tokenRe.exec(line)) !== null) {
      out += line.slice(last, m.index);
      const full = m[0];
      const isClose = !!m[1];
      const name = (m[2] || '').toLowerCase();
      const selfClosing = /\/\s*>\s*$/.test(full);
      if (isClose) {
        if (depths[name] > 0) {
          depths[name]--;
          out += full;
        } // else drop stray closer
      } else {
        // opener; if self-closing, do not change depth
        if (!selfClosing) depths[name]++;
        out += full;
      }
      last = tokenRe.lastIndex;
    }
    out += line.slice(last);
    lines[i] = out;
  }
  return lines.join('\n');
}

export function removeDanglingSelfClose(str) {
  const lines = (str || '').split(/\r?\n/);
  let inFence = false;
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    if (!inFence && (line.startsWith('```') || line.startsWith('~~~'))) { inFence = true; lines[i] = line; continue; }
    if (inFence && (line.startsWith('```') || line.startsWith('~~~'))) { inFence = false; lines[i] = line; continue; }
    if (inFence) { lines[i] = line; continue; }
    // Drop pure fragment closers '</>' which MDX doesn't expect in MD
    if (/^\s*<\s*\/\s*>\s*$/.test(line)) { lines[i] = ''; continue; }
    let out = '';
    let j = 0;
    while (j < line.length) {
      const idx = line.indexOf('/>', j);
      if (idx === -1) { out += line.slice(j); break; }
      const seg = line.slice(j, idx);
      const relLastLt = seg.lastIndexOf('<');
      const relLastGt = seg.lastIndexOf('>');
      const absLastLt = relLastLt === -1 ? -1 : j + relLastLt;
      const absLastGt = relLastGt === -1 ? -1 : j + relLastGt;
      if (absLastLt > absLastGt) {
        out += line.slice(j, idx + 2); // inside a tag
        j = idx + 2;
      } else {
        out += line.slice(j, idx); // drop dangling '/>'
        j = idx + 2;
      }
    }
    const cleaned = out.replace(/<\s*\/\s*>/g, '&lt;/>');
    lines[i] = cleaned;
  }
  return lines.join('\n');
}

// Convert raw HTML comments to MDX comments outside code fences.
export function convertHtmlCommentsToMDX(str) {
  const lines = String(str || '').split(/\r?\n/);
  let inFence = false;
  let inComment = false;
  const out = [];
  for (let li = 0; li < lines.length; li++) {
    const line = lines[li];
    if (isFenceLine(line)) { inFence = !inFence; out.push(line); continue; }
    if (inFence) { out.push(line); continue; }
    let i = 0; let buf = '';
    while (i < line.length) {
      if (!inComment) {
        const idx = line.indexOf('<!--', i);
        if (idx === -1) { buf += line.slice(i); break; }
        buf += line.slice(i, idx) + '{/*';
        i = idx + 4;
        inComment = true;
      } else {
        const idx = line.indexOf('-->', i);
        if (idx === -1) { buf += line.slice(i); i = line.length; break; }
        buf += line.slice(i, idx) + '*/}';
        i = idx + 3;
        inComment = false;
      }
    }
    out.push(buf);
  }
  return out.join('\n');
}

// Ensure blank lines around selected block HTML tags to avoid inline HTML in MDX paragraphs
export function ensureBlankLinesAroundBlockHtml(str, tags = ['p']) {
  const tagAlt = tags.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
  const openRe = new RegExp(`^\\s*<\\s*(?:${tagAlt})\\b`, 'i');
  const closeRe = new RegExp(`^\\s*<\\s*\\/\\s*(?:${tagAlt})\\s*>\\s*$`, 'i');
  const lines = String(str || '').split(/\r?\n/);
  const out = [];
  let inFence = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (isFenceLine(line)) { inFence = !inFence; out.push(line); continue; }
    if (inFence) { out.push(line); continue; }
    const prev = out.length > 0 ? out[out.length - 1] : '';
    const next = (i + 1 < lines.length) ? lines[i + 1] : '';
    const isOpen = openRe.test(line);
    const isClose = closeRe.test(line);
    if (isOpen && prev.trim() !== '') out.push('');
    out.push(line);
    if (isClose && next.trim() !== '') out.push('');
  }
  return out.join('\n');
}

// Ensure component tags like <Quiz> and </Quiz> are on their own lines
export function ensureComponentTagsOnOwnLine(str, tags = ['Quiz']) {
  const tagAlt = tags.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
  const openRe = new RegExp(`^(.*?)(<\\s*(?:${tagAlt})\\b[^>]*>)(.*)$`, 'i');
  const closeRe = new RegExp(`^(.*?)(<\\s*\\/\\s*(?:${tagAlt})\\s*>)(.*)$`, 'i');
  const lines = String(str || '').split(/\r?\n/);
  let inFence = false;
  const out = [];
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    if (isFenceLine(line)) { inFence = !inFence; out.push(line); continue; }
    if (inFence) { out.push(line); continue; }
    let m = openRe.exec(line);
    if (m && (m[1].trim() !== '' || m[3].trim() !== '')) {
      const left = m[1].trimEnd();
      const tag = m[2];
      const right = m[3].trimStart();
      if (left) out.push(left);
      out.push(tag);
      if (right) out.push(right);
      continue;
    }
    m = closeRe.exec(line);
    if (m && (m[1].trim() !== '' || m[3].trim() !== '')) {
      const left = m[1].trimEnd();
      const tag = m[2];
      const right = m[3].trimStart();
      if (left) out.push(left);
      out.push(tag);
      if (right) out.push(right);
      continue;
    }
    out.push(line);
  }
  return out.join('\n');
}

// Ensure a blank line before opener and after closer for component tags
export function ensureBlankLinesAroundComponents(str, tags = ['Quiz']) {
  const tagAlt = tags.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
  const openExact = new RegExp(`^\s*<\s*(?:${tagAlt})\b[^>]*>\s*$`, 'i');
  const closeExact = new RegExp(`^\s*<\s*/\s*(?:${tagAlt})\s*>\s*$`, 'i');
  const lines = String(str || '').split(/\r?\n/);
  const out = [];
  let inFence = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (isFenceLine(line)) { inFence = !inFence; out.push(line); continue; }
    if (inFence) { out.push(line); continue; }
    if (openExact.test(line)) {
      const prev = out.length > 0 ? out[out.length - 1] : '';
      if (prev.trim() !== '') out.push('');
      out.push(line);
      continue;
    }
    if (closeExact.test(line)) {
      out.push(line);
      const next = (i + 1 < lines.length) ? lines[i + 1] : '';
      if (next.trim() !== '') out.push('');
      continue;
    }
    out.push(line);
  }
  return out.join('\n');
}

// Merge CodeEditor markers where authors use an empty <CodeEditor></CodeEditor> line
// followed by raw code and a later </CodeEditor>. Produces a single CodeEditor block
// wrapping the intervening lines.
export function mergeCodeEditorBlocks(str) {
  const lines = String(str || '').split(/\r?\n/);
  let inFence = false;
  const out = [];
  let capturing = false;
  let attrs = '';
  let buf = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (isFenceLine(line)) { inFence = !inFence; if (!capturing) out.push(line); continue; }
    if (inFence) { if (capturing) buf.push(line); else out.push(line); continue; }
    if (!capturing) {
      const m = /^\s*<\s*CodeEditor\b([^>]*)>\s*<\s*\/\s*CodeEditor\s*>\s*$/.exec(line);
      if (m) {
        let hasCloser = false;
        for (let j = i + 1; j < lines.length; j++) {
          const peek = lines[j];
          if (isFenceLine(peek)) break;
          if (/^\s*<\s*CodeEditor\b/i.test(peek)) break;
          if (/^\s*<\s*\/\s*CodeEditor\s*>\s*$/i.test(peek)) { hasCloser = true; break; }
        }
        if (!hasCloser) {
          out.push(line);
          continue;
        }
        capturing = true;
        attrs = m[1] || '';
        buf = [];
        continue;
      }
      out.push(line);
    } else {
      if (/^\s*<\s*\/\s*CodeEditor\s*>\s*$/.test(line)) {
        out.push(`<CodeEditor${attrs}>`);
        if (buf.length) out.push(buf.join('\n'));
        out.push(`</CodeEditor>`);
        capturing = false;
        attrs = '';
        buf = [];
      } else {
        buf.push(line);
      }
    }
  }
  if (capturing) {
    out.push(`<CodeEditor${attrs}>`);
    if (buf.length) out.push(buf.join('\n'));
    out.push(`</CodeEditor>`);
  }
  return out.join('\n');
}

export function openEmptyCodeEditorPairs(str) {
  const lines = String(str || '').split(/\r?\n/);
  let inFence = false;
  const out = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (isFenceLine(line)) { inFence = !inFence; out.push(line); continue; }
    if (inFence) { out.push(line); continue; }
    const m = /^\s*<\s*CodeEditor\b([^>]*)>\s*<\s*\/\s*CodeEditor\s*>\s*$/.exec(line);
    if (m) {
      let hasCloser = false;
      for (let j = i + 1; j < lines.length; j++) {
        const peek = lines[j];
        if (isFenceLine(peek)) break;
        if (/^\s*<\s*CodeEditor\b/i.test(peek)) break;
        if (/^\s*<\s*\/\s*CodeEditor\s*>\s*$/i.test(peek)) { hasCloser = true; break; }
      }
      if (hasCloser) {
        out.push(`<CodeEditor${m[1] || ''}>`);
        continue;
      }
    }
    out.push(line);
  }
  return out.join('\n');
}

// Ensure that content of certain block HTML tags starts on its own line (e.g., <p ...>Text -> <p ...>\nText)
export function ensureBlockHtmlContentOnOwnLine(str, tags = ['p']) {
  const tagAlt = tags.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
  const openRe = new RegExp(`^\\s*<\\s*(?:${tagAlt})\\b`, 'i');
  const lines = String(str || '').split(/\r?\n/);
  const out = [];
  let inFence = false;
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    const isFence = line.startsWith('```') || line.startsWith('~~~');
    if (isFence) { inFence = !inFence; out.push(line); continue; }
    if (inFence) { out.push(line); continue; }
    if (openRe.test(line)) {
      const pos = line.indexOf('>');
      if (pos !== -1) {
        const after = line.slice(pos + 1);
        if (after.trim() !== '') {
          out.push(line.slice(0, pos + 1));
          out.push(after.replace(/^\s+/, ''));
          continue;
        }
      }
    }
    out.push(line);
  }
  return out.join('\n');
}

// Ensure a blank line after inline closing tags like "...text</p>" when they end a line
export function ensureBlankAfterInlineClose(str, tags = ['p']) {
  const tagAlt = tags.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
  const inlineCloseRe = new RegExp(`</\\s*(?:${tagAlt})\\s*>\\s*$`, 'i');
  const pureCloseRe = new RegExp(`^\\s*<\\s*/\\s*(?:${tagAlt})\\s*>\\s*$`, 'i');
  const lines = String(str || '').split(/\r?\n/);
  const out = [];
  let inFence = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const isFence = line.startsWith('```') || line.startsWith('~~~');
    if (isFence) { inFence = !inFence; out.push(line); continue; }
    if (inFence) { out.push(line); continue; }
    out.push(line);
    if (inlineCloseRe.test(line) && !pureCloseRe.test(line)) {
      const next = (i + 1 < lines.length) ? lines[i + 1] : '';
      if (next.trim() !== '') out.push('');
    }
  }
  return out.join('\n');
}

// Replace angle-bracket autolinks like <https://example.com> with plain URLs to avoid MDX JSX parse
export function fixAngleBracketAutolinks(str) {
  const lines = String(str || '').split(/\r?\n/);
  let inFence = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (isFenceLine(line)) { inFence = !inFence; continue; }
    if (inFence) continue;
    lines[i] = line.replace(/<\s*(https?:\/\/[^>\s]+)\s*>/g, '$1');
  }
  return lines.join('\n');
}

// Escape lines that look like JSX/HTML with colons or dots in the tag name (e.g., <Axes: ...>, <pandas.core...>)
export function escapeSuspiciousTagStarts(str) {
  const lines = String(str || '').split(/\r?\n/);
  let inFence = false;
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    if (isFenceLine(line)) { inFence = !inFence; continue; }
    if (inFence) continue;
    // Escape Jupyter-style repr like: <class 'pandas.core.frame.DataFrame'>
    if (/^\s*<\s*class\b/i.test(line)) {
      const idx = line.indexOf('<');
      lines[i] = line.slice(0, idx) + '&lt;' + line.slice(idx + 1);
      continue;
    }
    const m = /^\s*<\s*([A-Za-z][A-Za-z0-9_.:-]*)/.exec(line);
    if (m) {
      const name = m[1];
      if (/[.:]/.test(name) && !/^https?:/.test(name)) {
        const idx = line.indexOf('<');
        lines[i] = line.slice(0, idx) + '&lt;' + line.slice(idx + 1);
      }
    }
  }
  return lines.join('\n');
}

// Escape bare inline tag examples like <a> or <head> in prose
export function escapeBareInlineTags(str, tags = ['a','head']) {
  const lines = String(str || '').split(/\r?\n/);
  let inFence = false;
  const out = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (isFenceLine(line)) { inFence = !inFence; out.push(line); continue; }
    if (inFence) { out.push(line); continue; }
    const parts = line.split('`');
    for (let j = 0; j < parts.length; j += 2) {
      parts[j] = parts[j].replace(/<\s*(?:a|head)\s*>/gi, m => m.replace('<','&lt;').replace('>','&gt;'));
    }
    out.push(parts.join('`'));
  }
  return out.join('\n');
}

// Escape triple angle runs like "<<<" and ">>>" in prose to avoid MDX confusion
export function escapeTripleAngleRuns(str) {
  const lines = String(str || '').split(/\r?\n/);
  let inFence = false;
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    if (isFenceLine(line)) { inFence = !inFence; continue; }
    if (inFence) continue;
    lines[i] = line.replace(/<\s*<\s*</g, '&lt;&lt;&lt;').replace(/>\s*>\s*>/g, '&gt;&gt;&gt;');
  }
  return lines.join('\n');
}

// Merge a line with only <p> and the following line ending with </p> into plain text
export function mergeAdjacentPTagLines(str) {
  const lines = String(str || '').split(/\r?\n/);
  let inFence = false;
  const out = [];
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    if (isFenceLine(line)) { inFence = !inFence; out.push(line); continue; }
    if (inFence) { out.push(line); continue; }
    const m = /^\s*<\s*p\b[^>]*>\s*$/.exec(line);
    if (m && i + 1 < lines.length) {
      const next = lines[i + 1];
      if (/</.test(next) && /<\s*\/\s*p\s*>\s*$/.test(next)) {
        out.push(next.replace(/\s*<\s*\/\s*p\s*>\s*$/i, ''));
        i++;
        continue;
      }
    }
    out.push(line);
  }
  return out.join('\n');
}
// Convert one-line <p>text</p> into plain text to avoid MDX inline HTML issues
export function dropInlinePTagsToText(str) {
  const lines = String(str || '').split(/\r?\n/);
  let inFence = false;
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    if (isFenceLine(line)) { inFence = !inFence; continue; }
    if (inFence) continue;
    lines[i] = line.replace(/^\s*<\s*p\b[^>]*>\s*([^<][^>]*)\s*<\s*\/\s*p\s*>\s*$/i, '$1');
  }
  return lines.join('\n');
}

// Remove a stray </Quiz> that appears after an MDX comment on the same line
export function removeQuizCloserAfterMdxComment(str) {
  const lines = String(str || '').split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const endIdx = line.indexOf('*/}');
    const closeIdx = line.search(/<\s*\/\s*Quiz\s*>/i);
    if (endIdx !== -1 && closeIdx !== -1 && closeIdx > endIdx) {
      lines[i] = line.replace(/<\s*\/\s*Quiz\s*>/i, '');
    }
  }
  return lines.join('\n');
}

// Replace a bare CodeEditor opener with a balanced pair
export function closeBareCodeEditor(str) {
  const lines = String(str || '').split(/\r?\n/);
  let inFence = false;
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    if (isFenceLine(line)) { inFence = !inFence; continue; }
    if (inFence) continue;
    const m = /^\s*<\s*CodeEditor\b([^>]*)>\s*$/i.exec(line);
    if (m) {
      let hasCloser = false;
      for (let j = i + 1; j < lines.length; j++) {
        const peek = lines[j];
        if (isFenceLine(peek)) break;
        if (/^\s*<\s*CodeEditor\b/i.test(peek)) break;
        if (/^\s*<\s*\/\s*CodeEditor\s*>\s*$/i.test(peek)) { hasCloser = true; break; }
      }
      if (!hasCloser) {
        lines[i] = `<CodeEditor${m[1] || ''}></CodeEditor>`;
      }
    }
  }
  return lines.join('\n');
}

// Escape R left-arrow assignment operator '<-' in prose
export function escapeLeftArrowOperator(str) {
  const lines = String(str || '').split(/\r?\n/);
  let inFence = false;
  const out = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (isFenceLine(line)) { inFence = !inFence; out.push(line); continue; }
    if (inFence) { out.push(line); continue; }
    const parts = line.split('`');
    for (let j = 0; j < parts.length; j += 2) {
      parts[j] = parts[j].replace(/<-/g, '&lt;-');
    }
    out.push(parts.join('`'));
  }
  return out.join('\n');
}

// Quote numeric page attribute in Link components: page=5 -> page="5"
export function quoteLinkNumericPage(str) {
  const lines = String(str || '').split(/\r?\n/);
  let inFence = false;
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    if (isFenceLine(line)) { inFence = !inFence; continue; }
    if (inFence) continue;
    lines[i] = line.replace(/<\s*Link\b([^>]*?)\bpage\s*=\s*(\d+)\b([^>]*?)\/>/gi, '<Link$1page="$2"$3/>');
  }
  return lines.join('\n');
}
export function autoCloseInfoBlocks(str) {
  const lines = (str || '').split(/\r?\n/);
  let inFence = false;
  let openSince = -1;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!inFence && (line.startsWith('```') || line.startsWith('~~~'))) { inFence = true; continue; }
    if (inFence && (line.startsWith('```') || line.startsWith('~~~'))) { inFence = false; continue; }
    if (inFence) continue;
    // Drop stray closer when not currently open
    if (/^\s*<\/\s*Info\s*>\s*$/.test(line) && openSince === -1) { lines[i] = ''; continue; }
    // Opening Info
    if (/<Info\b[^>]*>/.test(line)) {
      if (/<\/\s*Info\s*>/.test(line)) continue; // balanced on same line
      if (openSince === -1) openSince = i;
      continue;
    }
    if (openSince !== -1) {
      const isHeading = /^\s*#{1,6}\s+/.test(line);
      const isTag = /^\s*<\s*[A-Za-z]/.test(line);
      // Do NOT close on blank lines. Close before a new heading or a new top-level tag line.
      if ((isHeading || isTag) && !/<\/\s*Info\s*>/.test(line)) {
        let j = i - 1; while (j >= openSince && lines[j].trim() === '') j--;
        const at = j >= openSince ? j : openSince;
        lines[at] = (lines[at] || '') + '</Info>';
        openSince = -1;
      }
    }
    // If we encounter a natural closing tag on a later line, clear the open marker
    if (/<\/\s*Info\s*>/.test(line)) openSince = -1;
  }
  if (openSince !== -1) {
    lines[lines.length - 1] = (lines[lines.length - 1] || '') + '</Info>';
  }
  return lines.join('\n');
}

export function autoCloseSecretBlocks(str) {
  const lines = (str || '').split(/\r?\n/);
  let inFence = false, openSince = -1;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
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
      const isTag = /^\s*<\s*[A-Za-z]/.test(line);
      // Do NOT close on blank lines; only before heading/tag or at EOF
      if ((isHeading || isTag) && !/<\/\s*Secret\s*>/.test(line)) {
        let j = i - 1; while (j >= openSince && lines[j].trim() === '') j--;
        const at = j >= openSince ? j : openSince;
        lines[at] = (lines[at] || '') + '</Secret>';
        openSince = -1;
      }
    }
    if (/<\/\s*Secret\s*>/.test(line)) openSince = -1;
  }
  if (openSince !== -1) {
    lines[lines.length - 1] = (lines[lines.length - 1] || '') + '</Secret>';
  }
  return lines.join('\n');
}

export function dropLeadingSliceArtifacts(str, tagNames = defaultStrayCloserTags) {
  const lines = (str || '').split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    if (/^\s*$/.test(l)) continue;
    if (/^\s*<\s*\/\s*>\s*$/.test(l)) { lines[i] = ''; continue; }
    if (/^\s*\/>/.test(l)) { lines[i] = l.replace(/^\s*\/>\s*/, ''); break; }
    // Leading stray closers for known tags
    const tagAlt = tagNames.join('|').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp(`^\\s*<\\s*/\\s*(?:${tagAlt})\\s*>\\s*$`, 'i');
    if (re.test(l)) { lines[i] = ''; continue; }
    break;
  }
  return lines.join('\n');
}

export function sanitizeBeforeParse(str, options = {}) {
  const tags = options.tags || defaultStrayCloserTags;
  let s = String(str || '');
  // Normalize bare fragment closers early, including cases with embedded newlines
  s = s.replace(/<\s*\/\s*>/g, '&lt;/>');
  s = normalizeVoids(s);
  s = ensureDownloadClosed(s);
  s = convertHtmlCommentsToMDX(s);
  s = ensureBlankLinesAroundBlockHtml(s, ['p']);
  s = ensureComponentTagsOnOwnLine(s, ['Quiz']);
  s = ensureBlankLinesAroundComponents(s, ['Quiz']);
  s = mergeCodeEditorBlocks(s);
  s = openEmptyCodeEditorPairs(s);
  s = escapeAnglesInsideCodeEditor(s);
  s = ensureBlockHtmlContentOnOwnLine(s, ['p']);
  s = ensureBlankAfterInlineClose(s, ['p']);
  s = mergeAdjacentPTagLines(s);
  s = fixAngleBracketAutolinks(s);
  s = escapeSuspiciousTagStarts(s);
  s = escapeBareInlineTags(s, ['a','head']);
  s = escapeTripleAngleRuns(s);
  s = escapeLeadingBlockquote(s);
  s = closeBareCodeEditor(s);
  s = escapeLeftArrowOperator(s);
  s = quoteLinkNumericPage(s);
  s = dropInlinePTagsToText(s);
  s = removeQuizCloserAfterMdxComment(s);
  s = stripStrayQuizClosers(s);
  s = normalizeQuizBlocks(s);
  s = normalizeKbd(s);
  s = balanceKbdGlobally(s);
  s = balanceKbdNesting(s);
  // Drop empty Info blocks (common authoring artifact): <Info></Info>
  s = s.replace(/^\s*<Info\b[^>]*>\s*<\/\s*Info\s*>\s*$/gmi, '');
  s = stripStrayClosers(s, tags);
  s = removeDanglingSelfClose(s);
  return s;
}

export function balanceKbdNesting(str) {
  const lines = String(str || '').split(/\r?\n/);
  let outLines = [];
  let depth = 0;
  let inFence = false;
  const isFence = (line) => line.startsWith('```') || line.startsWith('~~~');
  for (let li = 0; li < lines.length; li++) {
    let line = lines[li];
    // Toggle code fence state on fence lines
    if (isFence(line)) { inFence = !inFence; outLines.push(line); continue; }
    if (inFence) { outLines.push(line); continue; }
    const isHeading = /^\s*#{1,6}\s+/.test(line);
    const isBlank = line.trim() === '';
    if ((isHeading || isBlank) && depth > 0) {
      // Close any open kbd before paragraph break or new block start
      if (outLines.length === 0) {
        outLines.push(Array(depth).fill('</kbd>').join(''));
      } else {
        outLines[outLines.length - 1] += Array(depth).fill('</kbd>').join('');
      }
      depth = 0;
    }
    // Balance nesting within the current line, respecting inline backticks
    let res = '';
    let i = 0;
    let inInline = false;
    const tokenRe = /<\s*kbd\s*>|<\s*\/\s*kbd\s*>|`/gi;
    let m;
    while ((m = tokenRe.exec(line)) !== null) {
      res += line.slice(i, m.index);
      const tok = m[0];
      i = m.index + tok.length;
      if (tok === '`') { inInline = !inInline; res += tok; continue; }
      if (inInline) { res += tok; continue; }
      if (/^<\s*kbd\s*>/i.test(tok)) {
        if (depth > 0) { res += '</kbd>'; }
        res += tok; depth++;
      } else if (/^<\s*\/\s*kbd\s*>/i.test(tok)) {
        if (depth > 0) { res += tok; depth--; }
        // else stray closer: drop
      } else {
        res += tok;
      }
    }
    res += line.slice(i);
    outLines.push(res);
  }
  if (depth > 0) {
    if (outLines.length === 0) outLines = [Array(depth).fill('</kbd>').join('')];
    else outLines[outLines.length - 1] += Array(depth).fill('</kbd>').join('');
  }
  return outLines.join('\n');
}
