import { createElement, Fragment } from 'react';
import * as prod from 'react/jsx-runtime';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkFrontmatter from 'remark-frontmatter';
import remarkDirective from 'remark-directive';
import remarkDirectiveRehype from 'remark-directive-rehype';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeDhriftHighlight from '../../utils/rehypeDhriftHighlight';
import rehypeReact from 'rehype-react';
import { ALIGNED_WORKSHOP_BRANCH, normalizeKnownAssetUrl } from '../../utils/github';

// Import directive components
import {
  InfoDirective,
  SecretDirective,
  QuizDirective,
  KeywordsDirective,
  CodeEditorDirective,
  DownloadDirective,
  JupyterDirective,
  TerminalDirective,
  PythonReplDirective,
  LinkDirective,
} from './DirectiveComponents';

const supportedDirectiveNames = new Set([
  'info',
  'secret',
  'quiz',
  'keywords',
  'codeeditor',
  'download',
  'jupyter',
  'terminal',
  'pythonrepl',
  'link',
  'kbd',
  'html',
  'head',
  'body',
  'script',
  'title',
  'meta',
]);

function restoreUnsupportedDirectives() {
  const directiveTypes = new Set(['containerDirective', 'leafDirective', 'textDirective']);

  return (tree, file) => {
    const source = String(file.value || '');

    const originalSource = (node) => {
      const start = node.position?.start?.offset;
      const end = node.position?.end?.offset;
      if (typeof start === 'number' && typeof end === 'number' && source) {
        return source.slice(start, end);
      }
      return `${node.type === 'containerDirective' ? ':::' : ':'}${node.name}`;
    };

    const walk = (node) => {
      if (!Array.isArray(node.children)) return;

      for (let i = 0; i < node.children.length; i += 1) {
        const child = node.children[i];
        if (directiveTypes.has(child.type) && !supportedDirectiveNames.has(child.name)) {
          const value = originalSource(child);
          node.children[i] = child.type === 'textDirective'
            ? { type: 'text', value }
            : { type: 'paragraph', children: [{ type: 'text', value }] };
        } else {
          walk(child);
        }
      }
    };

    walk(tree);
  };
}

function renderHtmlExampleTag(tagName, props = {}) {
  const attrs = Object.entries(props)
    .filter(([name]) => name !== 'children' && name !== 'node')
    .map(([name, value]) => value === true ? name : `${name}="${String(value)}"`)
    .join(' ');
  const open = attrs ? `<${tagName} ${attrs}>` : `<${tagName}>`;

  return (
    <code>
      {open}
      {props.children}
      {`</${tagName}>`}
    </code>
  );
}

// Custom image component to handle GitHub-hosted images
function CustomImage({ src, alt, gitUser, gitRepo, gitFile, gitBranch = ALIGNED_WORKSHOP_BRANCH }) {
  let imageSrc = normalizeKnownAssetUrl(src);

  // If not an external URL, resolve to GitHub raw URL
  if (imageSrc && !imageSrc.startsWith('http')) {
    // Remove leading slash if present for consistent path building
    const cleanPath = imageSrc.startsWith('/') ? imageSrc.slice(1) : imageSrc;
    imageSrc = `https://raw.githubusercontent.com/${gitUser}/${gitRepo}/${gitBranch}/${cleanPath}`;
  }

  return <img src={imageSrc} alt={alt || ''} loading="lazy" />;
}

/**
 * DirectiveMarkdown - Clean markdown processor using remark-directive
 *
 * Preprocesses content to ensure leaf directives (::name) are properly isolated
 * on their own lines, as remark-directive requires.
 */
export default function DirectiveMarkdown({
  content,
  allUploads,
  setCode,
  setEditorOpen,
  setActiveTab,
  setAskToRun,
  editors,
  setJupyterSrc,
  gitUser,
  gitRepo,
  gitFile,
  gitBranch = ALIGNED_WORKSHOP_BRANCH,
  instUser,
  instRepo,
}) {
  if (!content) return null;

  // Preprocess: ensure leaf directives are on their own lines
  // Handles cases like `::download{files="..."} <br/>` where <br/> breaks parsing
  let processedContent = content
    // Move <br>, <br/>, <br /> that follow leaf directives to next line
    .replace(/(::[\w-]+\{[^}]*\})\s*<br\s*\/?>/gi, '$1\n')
    // Also handle trailing whitespace after directives
    .replace(/(::[\w-]+\{[^}]*\})\s+$/gm, '$1');

  // Build component map with props passed through
  const components = {
    // Container directives (:::name)
    'info': (props) => <InfoDirective {...props} />,
    'secret': (props) => <SecretDirective {...props} />,
    'quiz': (props) => <QuizDirective {...props} />,
    'keywords': (props) => <KeywordsDirective {...props} />,
    'codeeditor': (props) => (
      <CodeEditorDirective
        {...props}
        setCode={setCode}
        setEditorOpen={setEditorOpen}
        setActiveTab={setActiveTab}
        setAskToRun={setAskToRun}
        editors={editors}
      />
    ),

    // Leaf directives (::name)
    'download': (props) => <DownloadDirective {...props} allUploads={allUploads} />,
    'jupyter': (props) => (
      <JupyterDirective
        {...props}
        setJupyterSrc={setJupyterSrc}
        setEditorOpen={setEditorOpen}
        setActiveTab={setActiveTab}
      />
    ),
    'terminal': () => <TerminalDirective />,
    'pythonrepl': () => <PythonReplDirective />,

    // Text directives (:name[text]{attrs})
    'link': (props) => (
      props.workshop || props.page
        ? <LinkDirective {...props} instUser={instUser} instRepo={instRepo} />
        : renderHtmlExampleTag('link', props)
    ),
    'kbd': ({ children }) => <kbd>{children}</kbd>,
    'html': (props) => renderHtmlExampleTag('html', props),
    'head': (props) => renderHtmlExampleTag('head', props),
    'body': (props) => renderHtmlExampleTag('body', props),
    'script': (props) => renderHtmlExampleTag('script', props),
    'title': (props) => renderHtmlExampleTag('title', props),
    'meta': (props) => renderHtmlExampleTag('meta', props),

    // Standard HTML elements
    'img': (props) => (
      <CustomImage {...props} gitUser={gitUser} gitRepo={gitRepo} gitFile={gitFile} gitBranch={gitBranch} />
    ),
  };

  try {
    const file = unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkFrontmatter)
      .use(remarkDirective)
      .use(restoreUnsupportedDirectives)
      .use(remarkDirectiveRehype)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeRaw)
      .use(rehypeDhriftHighlight)
      .use(rehypeReact, {
        createElement,
        Fragment,
        jsx: prod.jsx,
        jsxs: prod.jsxs,
        components,
      })
      .processSync(processedContent);

    return file.result;
  } catch (error) {
    console.error('DirectiveMarkdown parse error:', error);
    return (
      <div className="markdown-error">
        <p>Error rendering content: {error.message}</p>
        <pre>{content.slice(0, 500)}...</pre>
      </div>
    );
  }
}
