import hljsCore from 'highlight.js/lib/core';
import bash from 'highlight.js/lib/languages/bash';
import css from 'highlight.js/lib/languages/css';
import javascript from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';
import markdown from 'highlight.js/lib/languages/markdown';
import plaintext from 'highlight.js/lib/languages/plaintext';
import python from 'highlight.js/lib/languages/python';
import r from 'highlight.js/lib/languages/r';
import shell from 'highlight.js/lib/languages/shell';
import sql from 'highlight.js/lib/languages/sql';
import xml from 'highlight.js/lib/languages/xml';
import yaml from 'highlight.js/lib/languages/yaml';

const highlighter = hljsCore.newInstance();

highlighter.registerLanguage('bash', bash);
highlighter.registerLanguage('css', css);
highlighter.registerLanguage('javascript', javascript);
highlighter.registerLanguage('json', json);
highlighter.registerLanguage('markdown', markdown);
highlighter.registerLanguage('plaintext', plaintext);
highlighter.registerLanguage('python', python);
highlighter.registerLanguage('r', r);
highlighter.registerLanguage('shell', shell);
highlighter.registerLanguage('sql', sql);
highlighter.registerLanguage('xml', xml);
highlighter.registerLanguage('yaml', yaml);

highlighter.registerAliases(['js'], { languageName: 'javascript' });
highlighter.registerAliases(['plain', 'text'], { languageName: 'plaintext' });
highlighter.registerAliases(['py'], { languageName: 'python' });
highlighter.registerAliases(['sh', 'zsh', 'terminal', 'console'], { languageName: 'shell' });
highlighter.registerAliases(['html'], { languageName: 'xml' });

export function normalizeHighlightLanguage(lang) {
  if (!lang) return 'plaintext';

  const value = String(lang).toLowerCase().trim();

  switch (value) {
    case 'javascript':
    case 'js':
      return 'javascript';
    case 'python':
    case 'py':
      return 'python';
    case 'r':
      return 'r';
    case 'html':
    case 'xml':
      return 'xml';
    case 'bash':
    case 'shell':
    case 'sh':
    case 'zsh':
      return 'shell';
    case 'json':
      return 'json';
    case 'markdown':
    case 'md':
      return 'markdown';
    case 'css':
      return 'css';
    case 'sql':
      return 'sql';
    case 'yaml':
    case 'yml':
      return 'yaml';
    default:
      return value;
  }
}

export default highlighter;
