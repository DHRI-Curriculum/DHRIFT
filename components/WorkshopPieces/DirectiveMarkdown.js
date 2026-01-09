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
import rehypeHighlight from 'rehype-highlight';
import rehypeReact from 'rehype-react';

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

// Custom image component to handle GitHub-hosted images
function CustomImage({ src, alt, gitUser, gitRepo, gitFile, gitBranch = 'v2' }) {
  let imageSrc = src;

  // If not an external URL, resolve to GitHub raw URL
  if (src && !src.startsWith('http')) {
    // Remove leading slash if present for consistent path building
    const cleanPath = src.startsWith('/') ? src.slice(1) : src;
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
  setJupyterSrc,
  gitUser,
  gitRepo,
  gitFile,
  gitBranch = 'v2',
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
    'link': (props) => <LinkDirective {...props} instUser={instUser} instRepo={instRepo} />,
    'kbd': ({ children }) => <kbd>{children}</kbd>,

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
      .use(remarkDirectiveRehype)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeRaw)
      .use(rehypeHighlight)
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
