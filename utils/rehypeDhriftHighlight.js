import { toText } from 'hast-util-to-text';
import { visit } from 'unist-util-visit';
import highlighter from './dhriftHighlighter';

function language(node) {
  const list = node.properties.className;
  let name;

  if (!Array.isArray(list)) return undefined;

  for (const item of list) {
    const value = String(item);

    if (value === 'no-highlight' || value === 'nohighlight') return false;
    if (!name && value.startsWith('lang-')) name = value.slice(5);
    if (!name && value.startsWith('language-')) name = value.slice(9);
  }

  return name;
}

function scopeToClassName(name) {
  return name.split('.').map((part, index) => (
    index ? `${part}${'_'.repeat(index)}` : `hljs-${part}`
  ));
}

function highlightedChildrenToHast(children = []) {
  return children.map((child) => {
    if (typeof child === 'string') {
      return { type: 'text', value: child };
    }

    return {
      type: 'element',
      tagName: 'span',
      properties: { className: scopeToClassName(child.scope || '') },
      children: highlightedChildrenToHast(child.children),
    };
  });
}

export default function rehypeDhriftHighlight() {
  return function transform(tree, file) {
    visit(tree, 'element', (node, _, parent) => {
      if (
        node.tagName !== 'code' ||
        !parent ||
        parent.type !== 'element' ||
        parent.tagName !== 'pre'
      ) {
        return;
      }

      node.properties = node.properties || {};
      const lang = language(node);
      if (!lang) return;

      if (!Array.isArray(node.properties.className)) {
        node.properties.className = [];
      }

      if (!node.properties.className.includes('hljs')) {
        node.properties.className.unshift('hljs');
      }

      try {
        const result = highlighter.highlight(toText(parent), {
          language: lang,
          ignoreIllegals: true,
        });
        const highlightedChildren = highlightedChildrenToHast(result._emitter.rootNode.children);

        if (highlightedChildren.length > 0) {
          node.children = highlightedChildren;
        }
      } catch (error) {
        if (/Unknown language/.test(error.message)) {
          file.message(`Cannot highlight as \`${lang}\`; language is not registered`, {
            ancestors: [parent, node],
            cause: error,
            place: node.position,
            ruleId: 'missing-language',
            source: 'rehype-dhrift-highlight',
          });
          return;
        }

        throw error;
      }
    });
  };
}
