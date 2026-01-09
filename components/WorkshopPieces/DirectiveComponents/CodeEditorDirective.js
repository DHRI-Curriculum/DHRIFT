import CodeRunBox from '../../Editor/CodeRunBox';
import { Children, isValidElement } from 'react';

/**
 * Reconstruct code text from React children, handling cases where
 * markdown syntax was parsed (e.g., # comments becoming h1 headings)
 */
function reconstructCode(node, depth = 0) {
  if (typeof node === 'string') return node;
  if (node === null || node === undefined) return '';
  if (Array.isArray(node)) {
    return node.map(n => reconstructCode(n, depth)).join('');
  }

  if (isValidElement(node)) {
    const type = node.type;
    const children = node.props?.children;

    // Handle heading elements - reconstruct # prefix
    if (type === 'h1') return '# ' + reconstructCode(children, depth) + '\n';
    if (type === 'h2') return '## ' + reconstructCode(children, depth) + '\n';
    if (type === 'h3') return '### ' + reconstructCode(children, depth) + '\n';
    if (type === 'h4') return '#### ' + reconstructCode(children, depth) + '\n';

    // Handle code blocks (pre > code) - extract code content
    if (type === 'pre') {
      const codeChild = Children.toArray(children).find(
        c => isValidElement(c) && c.type === 'code'
      );
      if (codeChild) {
        return reconstructCode(codeChild.props?.children, depth);
      }
      return reconstructCode(children, depth);
    }

    // Handle inline code - just extract text
    if (type === 'code') {
      return reconstructCode(children, depth);
    }

    // Handle paragraphs - add newlines between them
    if (type === 'p') {
      return reconstructCode(children, depth) + '\n';
    }

    // Handle blockquotes - not common in code but handle anyway
    if (type === 'blockquote') {
      return '> ' + reconstructCode(children, depth) + '\n';
    }

    // Handle lists
    if (type === 'ul' || type === 'ol') {
      return reconstructCode(children, depth);
    }
    if (type === 'li') {
      return '- ' + reconstructCode(children, depth) + '\n';
    }

    // For other elements, just recurse into children
    if (children) {
      return reconstructCode(children, depth);
    }
  }

  return '';
}

export default function CodeEditorDirective({ children, language, setCode, setEditorOpen, setActiveTab, setAskToRun }) {
  // Reconstruct code from potentially-parsed markdown children
  let codeText = reconstructCode(children);

  // Clean up extra whitespace
  codeText = codeText.trim();

  return (
    <CodeRunBox
      defaultCode={codeText}
      language={language}
      setCode={setCode}
      setEditorOpen={setEditorOpen}
      setActiveTab={setActiveTab}
      setAskToRun={setAskToRun}
    />
  );
}
