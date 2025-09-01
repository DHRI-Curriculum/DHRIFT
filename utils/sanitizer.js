// Shared sanitizer utilities for Markdown/MDX preprocessing and page-slice hygiene
// All functions are pure string transforms; callers compose them as needed.

const COMPONENT_TAGS = [
  'Info','Secret','Keywords','CodeEditor','Download','Jupyter','PythonREPL','Terminal','Link'
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

export function ensureDownloadClosed(str) {
  return (str || '').replace(/<Download(\b[^>]*?)>(?!\s*<\s*\/\s*Download\s*>)/gi, '<Download$1></Download>');
}

export function stripStrayQuizClosers(str) {
  const lines = (str || '').split(/\r?\n/);
  let depth = 0;
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    const opens = (line.match(/<\s*Quiz\b[^>]*>/gi) || []).length;
    line = line.replace(/<\s*\/\s*Quiz\s*>/gi, (m) => {
      if (depth > 0) { depth--; return m; }
      return '';
    });
    depth += opens;
    lines[i] = line;
  }
  return lines.join('\n');
}

export function normalizeQuizBlocks(str) {
  const lines = (str || '').split(/\r?\n/);
  let inFence = false, openSince = -1;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!inFence && (line.startsWith('```') || line.startsWith('~~~'))) { inFence = true; continue; }
    if (inFence && (line.startsWith('```') || line.startsWith('~~~'))) { inFence = false; continue; }
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
    if (!inFence && (line.startsWith('```') || line.startsWith('~~~'))) { inFence = true; lines[i] = line; continue; }
    if (inFence && (line.startsWith('```') || line.startsWith('~~~'))) { inFence = false; lines[i] = line; continue; }
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
  const reOpen = (nm) => new RegExp(`<\\s*${nm}\\b[^>]*>`, 'gi');
  const reClose = (nm) => new RegExp(`<\\s*/\\s*${nm}\\s*>`, 'gi');
  const depths = Object.fromEntries(tagNames.map(n => [n.toLowerCase(), 0]));
  const lines = (str || '').split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    // count openers first
    tagNames.forEach((nm) => { const key = nm.toLowerCase(); const opens = (line.match(reOpen(nm)) || []).length; depths[key] += opens; });
    // then remove unmatched closers
    tagNames.forEach((nm) => {
      line = line.replace(reClose(nm), (m) => {
        const key = nm.toLowerCase();
        if (depths[key] > 0) { depths[key]--; return m; }
        return '';
      });
    });
    lines[i] = line;
  }
  return lines.join('\n');
}

export function removeDanglingSelfClose(str) {
  const lines = (str || '').split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
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
    lines[i] = out.replace(/(^|\s)<\s*\/\s*>($|\s)/g, '$1$2');
  }
  return lines.join('\n');
}

export function autoCloseInfoBlocks(str) {
  const lines = (str || '').split(/\r?\n/);
  let inFence = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!inFence && (line.startsWith('```') || line.startsWith('~~~'))) { inFence = true; continue; }
    if (inFence && (line.startsWith('```') || line.startsWith('~~~'))) { inFence = false; continue; }
    if (inFence) continue;
    if (/<!--\s*<Info\b/i.test(line)) continue;
    if (/<Info\b[^>]*>/.test(line)) {
      if (/<\/\s*Info\s*>/.test(line)) continue;
      let j = i + 1, found = false;
      while (j < lines.length) {
        const l2 = lines[j];
        if (!l2.trim()) break;
        if (!inFence && (l2.startsWith('```') || l2.startsWith('~~~'))) break;
        if (/<\/\s*Info\s*>/.test(l2)) { found = true; break; }
        j++;
      }
      if (!found) {
        const insertAt = j - 1 >= i ? j - 1 : i;
        lines[insertAt] = (lines[insertAt] || '') + '</Info>';
      }
    }
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
      if ((!line.trim() || isHeading || isTag) && !/<\/\s*Secret\s*>/.test(line)) {
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
  s = normalizeVoids(s);
  s = ensureDownloadClosed(s);
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
