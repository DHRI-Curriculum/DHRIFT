#!/usr/bin/env node
/**
 * Migration script to convert JSX-style workshop components to directive syntax
 *
 * Usage:
 *   node scripts/migrate-to-directives.mjs input.md output.md
 *   node scripts/migrate-to-directives.mjs input.md  # overwrites input
 *
 * Converts:
 *   <Info>content</Info>  →  :::info\ncontent\n:::
 *   <Secret>content</Secret>  →  :::secret\ncontent\n:::
 *   <Quiz>content</Quiz>  →  :::quiz\ncontent\n:::
 *   <Keywords>content</Keywords>  →  :::keywords\ncontent\n:::
 *   <CodeEditor language="python">code</CodeEditor>  →  :::codeeditor{language="python"}\ncode\n:::
 *   <Download files="x.csv" />  →  ::download{files="x.csv"}
 *   <Jupyter IPYNB="x.ipynb" />  →  ::jupyter{ipynb="x.ipynb"}
 *   <PythonREPL />  →  ::pythonrepl
 *   <Terminal />  →  ::terminal
 *   <Link workshop="x" page=2>text</Link>  →  :link[text]{workshop="x" page="2"}
 */

import { readFileSync, writeFileSync } from 'fs';

// Extract attribute value from attribute string
function extractAttr(attrString, name) {
  // Handle both quoted and unquoted values
  const patterns = [
    new RegExp(`${name}\\s*=\\s*"([^"]*)"`, 'i'),
    new RegExp(`${name}\\s*=\\s*'([^']*)'`, 'i'),
    new RegExp(`${name}\\s*=\\s*([^\\s>]+)`, 'i'),
  ];

  for (const pattern of patterns) {
    const match = attrString.match(pattern);
    if (match) return match[1];
  }
  return null;
}

// Build directive attributes string from JSX attributes
function buildAttrs(attrString, attrNames) {
  const attrs = [];
  for (const name of attrNames) {
    const value = extractAttr(attrString, name);
    if (value) {
      attrs.push(`${name.toLowerCase()}="${value}"`);
    }
  }
  return attrs.length > 0 ? `{${attrs.join(' ')}}` : '';
}

const conversions = [
  // Container blocks: <Tag>content</Tag> → :::tag\ncontent\n:::
  {
    name: 'Info',
    pattern: /<Info\b[^>]*>([\s\S]*?)<\/Info>/gi,
    replace: (_, content) => `:::info\n${content.trim()}\n:::`
  },
  {
    name: 'Secret',
    pattern: /<Secret\b([^>]*)>([\s\S]*?)<\/Secret>/gi,
    replace: (_, attrs, content) => {
      const title = extractAttr(attrs, 'title') || extractAttr(attrs, 'hint');
      const attrStr = title ? `{title="${title}"}` : '';
      return `:::secret${attrStr}\n${content.trim()}\n:::`;
    }
  },
  {
    name: 'Quiz',
    pattern: /<Quiz\b[^>]*>([\s\S]*?)<\/Quiz>/gi,
    replace: (_, content) => `:::quiz\n${content.trim()}\n:::`
  },
  {
    name: 'Keywords',
    pattern: /<Keywords\b[^>]*>([\s\S]*?)<\/Keywords>/gi,
    replace: (_, content) => `:::keywords\n${content.trim()}\n:::`
  },
  {
    name: 'CodeEditor',
    pattern: /<CodeEditor\b([^>]*)>([\s\S]*?)<\/CodeEditor>/gi,
    replace: (_, attrs, content) => {
      const attrStr = buildAttrs(attrs, ['language']);
      return `:::codeeditor${attrStr}\n${content.trim()}\n:::`;
    }
  },

  // Self-closing leaf elements: <Tag attr /> → ::tag{attr}
  {
    name: 'Download',
    pattern: /<Download\b([^>]*?)\/?>/gi,
    replace: (_, attrs) => {
      const files = extractAttr(attrs, 'files') || extractAttr(attrs, 'href');
      return files ? `::download{files="${files}"}` : '::download';
    }
  },
  {
    name: 'Jupyter',
    pattern: /<Jupyter\b([^>]*?)\/?>/gi,
    replace: (_, attrs) => {
      const ipynb = extractAttr(attrs, 'IPYNB') || extractAttr(attrs, 'ipynb');
      return ipynb ? `::jupyter{ipynb="${ipynb}"}` : '::jupyter';
    }
  },
  {
    name: 'PythonREPL',
    pattern: /<PythonREPL\s*\/?>/gi,
    replace: '::pythonrepl'
  },
  {
    name: 'Terminal',
    pattern: /<Terminal\s*\/?>/gi,
    replace: '::terminal'
  },

  // Inline elements: <Link attr>text</Link> → :link[text]{attr}
  {
    name: 'Link',
    pattern: /<Link\b([^>]*)>([^<]*)<\/Link>/gi,
    replace: (_, attrs, text) => {
      const workshop = extractAttr(attrs, 'workshop');
      const page = extractAttr(attrs, 'page');
      const attrParts = [];
      if (workshop) attrParts.push(`workshop="${workshop}"`);
      if (page) attrParts.push(`page="${page}"`);
      const attrStr = attrParts.length > 0 ? `{${attrParts.join(' ')}}` : '';
      return `:link[${text.trim()}]${attrStr}`;
    }
  },
];

function migrateContent(content) {
  let result = content;
  let changesMade = [];

  for (const conversion of conversions) {
    const before = result;
    result = result.replace(conversion.pattern, conversion.replace);
    if (result !== before) {
      const count = (before.match(conversion.pattern) || []).length;
      changesMade.push(`${conversion.name}: ${count} conversion(s)`);
    }
  }

  return { result, changesMade };
}

// Main CLI
const args = process.argv.slice(2);

if (args.length === 0) {
  console.log(`
Usage:
  node scripts/migrate-to-directives.mjs <input.md> [output.md]

Examples:
  node scripts/migrate-to-directives.mjs workshop.md workshop-v2.md
  node scripts/migrate-to-directives.mjs workshop.md  # overwrites in place

This script converts JSX-style components to remark-directive syntax:
  <Info>content</Info>  →  :::info\\ncontent\\n:::
  <Secret>content</Secret>  →  :::secret\\ncontent\\n:::
  <Quiz>- opt*</Quiz>  →  :::quiz\\n- opt*\\n:::
  <CodeEditor language="py">code</CodeEditor>  →  :::codeeditor{language="py"}\\ncode\\n:::
  <Download files="x.csv" />  →  ::download{files="x.csv"}
  <PythonREPL />  →  ::pythonrepl
  <Link workshop="py" page=2>text</Link>  →  :link[text]{workshop="py" page="2"}
`);
  process.exit(0);
}

const inputPath = args[0];
const outputPath = args[1] || inputPath;

try {
  const content = readFileSync(inputPath, 'utf-8');
  const { result, changesMade } = migrateContent(content);

  writeFileSync(outputPath, result, 'utf-8');

  console.log(`Migrated: ${inputPath} → ${outputPath}`);
  if (changesMade.length > 0) {
    console.log('Changes:');
    changesMade.forEach(c => console.log(`  - ${c}`));
  } else {
    console.log('No JSX components found to convert.');
  }
} catch (err) {
  console.error(`Error: ${err.message}`);
  process.exit(1);
}
