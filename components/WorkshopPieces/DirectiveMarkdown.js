import { createElement, Fragment } from 'react';
import * as prod from 'react/jsx-runtime';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkFrontmatter from 'remark-frontmatter';
import remarkDeflist from 'remark-deflist';
import remarkDirective from 'remark-directive';
import remarkDirectiveRehype from 'remark-directive-rehype';
import remarkRehype from 'remark-rehype';
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
function CustomImage({ src, alt, gitUser, gitRepo, gitFile }) {
  let imageSrc = src;

  // If relative path, resolve to GitHub raw URL
  if (src && !src.startsWith('http') && !src.startsWith('/')) {
    imageSrc = `https://raw.githubusercontent.com/${gitUser}/${gitRepo}/main/${src}`;
  }

  return <img src={imageSrc} alt={alt || ''} loading="lazy" />;
}

/**
 * DirectiveMarkdown - Clean markdown processor using remark-directive
 *
 * NO SANITIZATION NEEDED - directive syntax (:::info, ::download, :link)
 * parses cleanly without conflicts with MDX/JSX.
 */
export default function DirectiveMarkdown({
  content,
  allUploads,
  setCode,
  setEditorOpen,
  setAskToRun,
  setJupyterSrc,
  gitUser,
  gitRepo,
  gitFile,
  instUser,
  instRepo,
}) {
  if (!content) return null;

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
        setAskToRun={setAskToRun}
      />
    ),

    // Leaf directives (::name)
    'download': (props) => <DownloadDirective {...props} allUploads={allUploads} />,
    'jupyter': (props) => <JupyterDirective {...props} setJupyterSrc={setJupyterSrc} />,
    'terminal': () => <TerminalDirective />,
    'pythonrepl': () => <PythonReplDirective />,

    // Text directives (:name[text]{attrs})
    'link': (props) => <LinkDirective {...props} instUser={instUser} instRepo={instRepo} />,
    'kbd': ({ children }) => <kbd>{children}</kbd>,

    // Standard HTML elements
    'img': (props) => (
      <CustomImage {...props} gitUser={gitUser} gitRepo={gitRepo} gitFile={gitFile} />
    ),
  };

  try {
    const file = unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkFrontmatter)
      .use(remarkDeflist)
      .use(remarkDirective)
      .use(remarkDirectiveRehype)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeHighlight)
      .use(rehypeReact, {
        createElement,
        Fragment,
        jsx: prod.jsx,
        jsxs: prod.jsxs,
        components,
      })
      .processSync(content);

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
