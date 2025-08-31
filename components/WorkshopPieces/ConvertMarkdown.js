import { useState } from 'react';
import 'highlight.js/styles/atom-one-dark.css'
import Image from 'next/image'
import PythonREPLComponent from '../Editor/PythonREPLComponent';
import CodeRunBox from '../Editor/CodeRunBox';
import Download from './Download';
import JSTerminal from '../Editor/JSTerminal';
import Info from './Info';
import JupyterLoad from './JupyterLoad';
import SecretComponent from './SecretComponent';
import HTMLEditorComponent from '../Editor/HTMLEditorComponent';
import QuizComponent from './QuizComponent';

import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkFrontmatter from 'remark-frontmatter';
import remarkDeflist from 'remark-deflist';
import remarkRehype from 'remark-rehype';
import remarkMdx from 'remark-mdx';
import rehypeHighlight from 'rehype-highlight';
import rehypeReact from 'rehype-react';
import React, { createElement, Fragment } from 'react';
import * as prod from 'react/jsx-runtime';


export default function ConvertMarkdown({ content, allUploads, workshopTitle, language, setCode, setEditorOpen, setAskToRun, gitUser, gitRepo, gitFile, instUser, instRepo, setJupyterSrc }) {

    // Helper: render a markdown string to React nodes (for nested content inside custom tags)
    const renderMarkdownToReact = (mdString) => {
        try {
            const file = unified()
                .use(remarkParse)
                .use(remarkGfm)
                .use(remarkRehype)
                .use(rehypeHighlight)
                .use(rehypeReact, {
                    createElement,
                    Fragment,
                    jsx: prod.jsx,
                    jsxs: prod.jsxs,
                })
                .processSync(mdString || '');
            return file.result;
        } catch (e) {
            return mdString;
        }
    }

    const Imager = ({ className, ...props }) => {
        let newProps = { ...props };
        const [src, setSrc] = useState(newProps.src);
        const [loadFailed, setLoadFailed] = useState(false);
        const [isGithubUrl, setIsGithubUrl] = useState(false);

        if (!newProps.src) {
            return <div className="image-error">Missing image source</div>;
        }

        const builtURL = `https://raw.githubusercontent.com/${gitUser}/${gitRepo}/main${newProps.src}`;

        return (
            <div className="image-container" style={{ position: 'relative' }}>
                <div className='markdown-image-container' style={{ position: 'relative' }} aria-label={newProps.alt}>
                    {loadFailed ? (
                        <div className="image-load-error" style={{
                            padding: '1rem', border: '1px dashed #ccc', borderRadius: '4px', color: '#666', textAlign: 'center'
                        }}>
                            Image could not be loaded
                            {newProps.alt && <div>Alt text: {newProps.alt}</div>}
                        </div>
                    ) : (
                        <Image
                            className='markdown-image'
                            width={0}
                            height={0}
                            src={src}
                            alt={newProps.alt || 'Image'}
                            onError={() => {
                                if (!isGithubUrl) {
                                    setSrc(builtURL);
                                    setIsGithubUrl(true);
                                } else {
                                    setLoadFailed(true);
                                }
                            }}
                            title={newProps.alt}
                            style={{
                                width: 'auto', maxWidth: '100%', height: 'auto', display: 'block', marginLeft: 'auto', marginRight: 'auto'
                            }}
                        />
                    )}
                </div>
            </div>
        );
    }

    const CodeEditor = ({ children, ...props }) => {
        const flattenToText = (node) => {
            if (node == null) return '';
            if (typeof node === 'string') return node;
            if (Array.isArray(node)) return node.map(flattenToText).join('');
            if (node.props && node.props.children !== undefined) return flattenToText(node.props.children);
            return '';
        }

        let codeText = flattenToText(children)
            .replace(/^\s*\n/, '')
            .replace(/\n\s*$/, '')
            .replace(/\r\n/g, '\n')
            .replace(/\r/g, '\n');

        return (
            <div>
                <CodeRunBox
                    language={props.language}
                    defaultCode={codeText}
                    {...props}
                />
            </div>
        );
    }

    const PythonREPL = () => (
        <div>
            <PythonREPLComponent />
        </div>
    );

    const Terminal = () => (
        <div>
            <JSTerminal />
        </div>
    );

    const Quiz = ({ children }) => {
        const content = (typeof children === 'string' || (Array.isArray(children) && children.every(c => typeof c === 'string')))
            ? renderMarkdownToReact(Array.isArray(children) ? children.join('') : children)
            : children;

        // Normalize so QuizComponent receives exactly one <ul> with <li> children
        let quizChild;
        if (Array.isArray(content)) {
            const firstUl = content.find((c) => c && typeof c === 'object' && c.type === 'ul');
            quizChild = firstUl ? firstUl : <ul>{content}</ul>;
        } else if (content && typeof content === 'object' && content.type === 'ul') {
            quizChild = content;
        } else {
            quizChild = <ul>{content}</ul>;
        }

        return (
            <div>
                <QuizComponent>
                    {quizChild}
                </QuizComponent>
            </div>
        );
    }

    const Keywords = ({ className, children, raw }) => {
        // If raw markdown is provided (from placeholder), parse it line-wise for robust extraction
        if (typeof raw === 'string' && raw.trim().length) {
            const lines = raw.replace(/\r\n?/g, '\n').split('\n');
            const items = [];
            let term = null;
            let defBuf = [];
            const flush = () => {
                if (term) {
                    const def = defBuf.join('\n').trim();
                    items.push({ term: term.trim(), definition: def ? renderMarkdownToReact(def) : null });
                }
                term = null; defBuf = [];
            }
            for (let i = 0; i < lines.length; i++) {
                const line = lines[i];
                const m = /^\s*-\s+(.*)\s*$/.exec(line);
                if (m) {
                    // New term starts
                    flush();
                    term = m[1];
                } else {
                    defBuf.push(line);
                }
            }
            flush();
            if (items.length === 0) return null;
            return (
                <div className="keywords">
                    <h3>Keywords</h3>
                    <ul>
                        {items.map(({ term, definition }) => (
                            <li key={term}>
                                <strong>{term}</strong>{definition ? <> - {definition}</> : null}
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }
        try {
            const toArray = (x) => Array.isArray(x) ? x : (x != null ? [x] : []);
            const getText = (node) => {
                if (node == null) return '';
                if (typeof node === 'string') return node;
                if (Array.isArray(node)) return node.map(getText).join('');
                if (node.props && node.props.children !== undefined) return getText(node.props.children);
                return '';
            };
            const splitTermDef = (liChildren) => {
                const parts = toArray(liChildren).slice();
                let term = '';
                const defParts = [];
                let split = false;
                for (let i = 0; i < parts.length; i++) {
                    const seg = parts[i];
                    if (!split && typeof seg === 'string') {
                        const idx = seg.indexOf('\n');
                        if (idx >= 0) {
                            term += seg.slice(0, idx);
                            const rem = seg.slice(idx + 1);
                            if (rem) defParts.push(rem);
                            for (let k = i + 1; k < parts.length; k++) defParts.push(parts[k]);
                            split = true;
                            break;
                        } else {
                            term += seg;
                        }
                    } else if (!split) {
                        term += getText(seg);
                    } else {
                        defParts.push(seg);
                    }
                }
                if (!split) {
                    const flat = getText(parts);
                    const idx = flat.indexOf('\n');
                    if (idx >= 0) {
                        term = flat.slice(0, idx);
                        const defText = flat.slice(idx + 1);
                        return { term: term.trim(), definition: <>{defText}</> };
                    }
                    return { term: flat.trim(), definition: null };
                }
                return { term: term.trim(), definition: <>{defParts}</> };
            };

            if (typeof children === 'string') {
                children = renderMarkdownToReact(children);
            }
            if (!children) return null;

            const nodes = toArray(children);
            const listNodes = nodes.filter((n) => n && typeof n === 'object' && (n.type === 'ul' || n.type === 'ol'));
            if (listNodes.length === 0) return null;

            const liNodes = toArray(listNodes[0].props?.children).filter(Boolean);
            const items = [];
            for (const li of liNodes) {
                if (!li || li.type !== 'li') continue;
                const { term, definition } = splitTermDef(li.props?.children);
                if (term) items.push({ term, definition });
            }

            return (
                <div className="keywords">
                    <h3>Keywords</h3>
                    <ul>
                        {items.map(({ term, definition }) => (
                            <li key={term}>
                                <strong>{term}</strong>{definition ? <> - {definition}</> : null}
                            </li>
                        ))}
                    </ul>
                </div>
            );
        } catch (e) {
            const content = (typeof children === 'string') ? renderMarkdownToReact(children) : children;
            return (
                <div className="keywords">
                    <h3>Keywords</h3>
                    <ul>{content}</ul>
                </div>
            );
        }
    }

    const Jupyter = ({ ...props }) => {
        const mapped = { ...props };
        // HTML parsing lowercases attribute names; support IPYNB -> ipynb
        if (mapped.ipynb && !mapped.IPYNB) mapped.IPYNB = mapped.ipynb;
        return (
            <div>
                <JupyterLoad setJupyterSrc={setJupyterSrc} {...mapped} />
            </div>
        );
    }

    const Secret = ({ children }) => {
        const content = (typeof children === 'string' || (Array.isArray(children) && children.every(c => typeof c === 'string')))
            ? renderMarkdownToReact(Array.isArray(children) ? children.join('') : children)
            : children;
        return (
            <div>
                <SecretComponent text={content} />
            </div>
        )
    }

    const LinkComp = ({ children, ...props }) => {
        const workshop = props.workshop;
        const pageNumber = props.page;
        return (
            <a href={`/dynamic?user=${gitUser}&repo=${gitRepo}&file=${workshop}&page=${pageNumber}&instUser=${instUser}&instRepo=${instRepo}`}>
                {children}
            </a>
        )
    }

    if (!content) return null;

    try {
        // Prevent HTML <link> parsing for our custom <Link>
        let safeContent = (content || '')
            .replace(/<\s*Link(\s|>)/g, '<dhrift-link$1')
            .replace(/<\/\s*Link\s*>/g, '</dhrift-link>');

        // Auto-close Info blocks that are opened but not closed before a blank line (outside fences/comments)
        const autoCloseInfoBlocks = (str) => {
            const lines = str.split(/\r?\n/);
            let inFence = false;
            for (let i = 0; i < lines.length; i++) {
                const line = lines[i];
                // toggle fences
                if (!inFence && (line.startsWith('```') || line.startsWith('~~~'))) { inFence = true; }
                else if (inFence && (line.startsWith('```') || line.startsWith('~~~'))) { inFence = false; }
                if (inFence) continue;
                // skip commented lines
                if (/<!--\s*<Info\b/i.test(line)) continue;
                if (/<Info\b[^>]*>/.test(line)) {
                    // if the same line has a closer, skip
                    if (/<\/\s*Info\s*>/.test(line)) continue;
                    // search until next blank line or fence for a closer
                    let j = i + 1;
                    let foundClose = false;
                    while (j < lines.length) {
                        const l2 = lines[j];
                        if (!l2.trim()) break; // blank line ends paragraph
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
        };
        safeContent = autoCloseInfoBlocks(safeContent);

        // First, strip stray </Quiz> that appear before any opener in the document (global)
        const stripStrayQuizClosers = (str) => {
            const lines = str.split(/\r?\n/);
            let depth = 0;
            for (let i = 0; i < lines.length; i++) {
                let line = lines[i];
                // count openers on this line
                const opens = (line.match(/<\s*Quiz\b[^>]*>/gi) || []).length;
                // strip unmatched closers while honoring depth
                line = line.replace(/<\s*\/\s*Quiz\s*>/gi, (m) => {
                    if (depth > 0) { depth--; return m; }
                    // depth == 0: drop this stray closer
                    return '';
                });
                depth += opens;
                lines[i] = line;
            }
            return lines.join('\n');
        }
        safeContent = stripStrayQuizClosers(safeContent);

        // Normalize Quiz blocks: auto-close <Quiz> before blank line or new block if no closer; drop stray </Quiz>
        const normalizeQuizBlocks = (str) => {
            const lines = str.split(/\r?\n/);
            let inFence = false;
            let openSince = -1;
            for (let i = 0; i < lines.length; i++) {
                const line = lines[i];
                if (!inFence && (line.startsWith('```') || line.startsWith('~~~'))) { inFence = true; }
                else if (inFence && (line.startsWith('```') || line.startsWith('~~~'))) { inFence = false; }
                if (inFence) continue;
                // If a quiz is open and we encounter a clear block boundary, auto-close before this line
                if (openSince !== -1) {
                    const isHeading = /^\s*#{1,6}\s+/.test(line);
                    const isTagOpen = /^\s*<\s*[A-Za-z]/.test(line); // starts another tag
                    const isNewQuiz = /<Quiz\b[^>]*>/.test(line);
                    if ((isHeading || isTagOpen) && !isNewQuiz) {
                        // close Quiz on the previous non-empty line
                        let j = i - 1;
                        while (j >= openSince && lines[j].trim() === '') j--;
                        const at = j >= openSince ? j : openSince;
                        lines[at] = (lines[at] || '') + '</Quiz>';
                        openSince = -1;
                        // continue processing this line as normal (do not skip it)
                    }
                }
                if (/^\s*<\/\s*Quiz\s*>\s*$/.test(line) && openSince === -1) {
                    // stray closing quiz without prior open in this block: drop it
                    lines[i] = '';
                    continue;
                }
                if (/<Quiz\b[^>]*>/.test(line)) {
                    if (/<\/\s*Quiz\s*>/.test(line)) {
                        // same-line closed
                        continue;
                    }
                    // mark open within this paragraph block
                    openSince = i;
                    continue;
                }
                // blank line ends paragraph; if open pending, append closer to previous non-empty line
                if (!line.trim() && openSince !== -1) {
                    let j = i - 1;
                    while (j >= openSince && lines[j].trim() === '') j--;
                    const at = j >= openSince ? j : openSince;
                    lines[at] = (lines[at] || '') + '</Quiz>';
                    openSince = -1;
                    continue;
                }
                // found explicit closer resets state
                if (/<\/\s*Quiz\s*>/.test(line)) {
                    openSince = -1;
                }
            }
            // If file ended while quiz open, close it at last line
            if (openSince !== -1) {
                lines[lines.length - 1] = (lines[lines.length - 1] || '') + '</Quiz>';
            }
            return lines.join('\n');
        };
        safeContent = normalizeQuizBlocks(safeContent);

        // Fix self-closing custom tags to proper open/close so HTML parser doesn't swallow following content
        // Specific known tags + generic PascalCase components
        safeContent = safeContent
            .replace(/<PythonREPL\s*\/>/g, '<PythonREPL></PythonREPL>')
            .replace(/<Terminal\s*\/>/g, '<Terminal></Terminal>')
            .replace(/<Jupyter([^>]*)\/>/g, '<Jupyter$1></Jupyter>')
            .replace(/<Download([^>]*)\/>/g, '<Download$1></Download>')
            // Generic: any self-closing PascalCase component becomes open/close
            .replace(/<([A-Z][A-Za-z0-9]*)([^>]*)\/>/g, '<$1$2></$1>');

        // Auto-close bare <Download ...> if not followed by </Download>
        safeContent = safeContent.replace(/<Download(\b[^>]*?)>(?!\s*<\s*\/\s*Download\s*>)/gi, '<Download$1></Download>');

        // Capture CodeEditor inner content exactly and replace with placeholder to preserve formatting
        const codeEditorSegments = [];
        safeContent = safeContent.replace(/<CodeEditor\b([^>]*)>([\s\S]*?)<\/CodeEditor>/gi, (m, attrs, inner) => {
            const idx = codeEditorSegments.length;
            codeEditorSegments.push(inner);
            return `<dhrift-codeeditor${attrs} data-index="${idx}"></dhrift-codeeditor>`;
        });

        // Isolate Secret content from outer Markdown parsing to prevent fence leakage
        const secretSegments = [];
        safeContent = safeContent.replace(/<Secret\b[^>]*>([\s\S]*?)<\/Secret>/gi, (m, inner) => {
            const idx = secretSegments.length;
            secretSegments.push(inner);
            return `<dhrift-secret data-index="${idx}"></dhrift-secret>`;
        });

        // Isolate Info content into placeholders to avoid MDX parsing issues and unbalanced tags
        const infoSegments = [];
        // Balanced Info blocks
        safeContent = safeContent.replace(/<Info\b[^>]*>([\s\S]*?)<\/Info>/gi, (m, inner) => {
            const idx = infoSegments.length;
            infoSegments.push(inner);
            return `<dhrift-info data-index="${idx}"></dhrift-info>`;
        });
        // Single-line Info without closer (capture rest of line)
        safeContent = safeContent.replace(/<Info\b[^>]*>([^\n]*)$/gmi, (m, inner) => {
            const idx = infoSegments.length;
            infoSegments.push(inner);
            return `<dhrift-info data-index="${idx}"></dhrift-info>`;
        });

        // Isolate Keywords content so we can parse terms/definitions from raw markdown reliably
        const keywordsSegments = [];
        safeContent = safeContent.replace(/<Keywords\b[^>]*>([\s\S]*?)<\/Keywords>/gi, (m, inner) => {
            const idx = keywordsSegments.length;
            keywordsSegments.push(inner);
            return `<dhrift-keywords data-index="${idx}"></dhrift-keywords>`;
        });

        // Escape curly braces in plain text (outside fences/inline code) to satisfy MDX parser
        const escapeCurlyForMDX = (str) => {
            let out = '';
            let i = 0;
            let inFence = false;
            let inInline = false;
            const knownHtml = new Set(['codeeditor','dhrift-codeeditor','secret','pythonrepl','terminal','jupyter','download','dhrift-secret','quiz','info','link','img','a','strong','em','p','div','span','ul','ol','li','pre','code','h1','h2','h3','h4','h5','h6','table','thead','tbody','tr','td','th','blockquote','hr','br','sup','sub','kbd','input','meta']);
            const voidTags = new Set(['br','hr','img','meta','link','input','source','track','area','base','col','embed','param','wbr']);
            const isAllowedTag = (name) => {
                if (!name) return false;
                const lower = name.toLowerCase();
                if (knownHtml.has(lower)) return true;
                if (lower.startsWith('dhrift-')) return true;
                // Allow arbitrary PascalCase custom components (ANOTHER-EXAMPLE tags etc.)
                return /^[A-Z]/.test(name);
            }
            while (i < str.length) {
                if (!inInline && (str.startsWith('```', i) || str.startsWith('~~~', i))) {
                    inFence = !inFence;
                    out += str.substr(i, 3);
                    i += 3;
                    continue;
                }
                if (!inFence && str[i] === '`') {
                    inInline = !inInline;
                    out += str[i++];
                    continue;
                }
                const ch = str[i];
                if (!inFence && !inInline && (ch === '{' || ch === '}')) {
                    out += (ch === '{') ? '&#123;' : '&#125;';
                    i++;
                    continue;
                }
                if (!inFence && !inInline && ch === '<') {
                    // Allow known tags and their closing forms; escape everything else
                    // Extract simple tag name
                    let j = i + 1;
                    let isClosing = false;
                    if (str[j] === '/') { isClosing = true; j++; }
                    let name = '';
                    while (j < str.length) {
                        const c = str[j];
                        if ((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || c === '-' ) { // allow dash in names like dhrift-secret
                            name += c;
                            j++;
                        } else {
                            break;
                        }
                    }
                    if (isAllowedTag(name)) {
                        // For void HTML tags in MDX, ensure self-closing form (<br />)
                        if (!isClosing && voidTags.has(name.toLowerCase())) {
                            // find end of tag '>'
                            let k = j;
                            while (k < str.length && str[k] !== '>') k++;
                            if (k < str.length) {
                                const tagInner = str.slice(i + 1, k); // without '<' and '>'
                                const alreadySelfClosed = /\/\s*$/.test(tagInner.trim());
                                if (!alreadySelfClosed) {
                                    out += '<' + tagInner.replace(/\s*$/, '') + ' />';
                                    i = k + 1;
                                    continue;
                                }
                            }
                        }
                        out += ch; i++; continue;
                    } else {
                        out += '&lt;'; i++; continue;
                    }
                }
                out += ch;
                i++;
            }
            return out;
        };
        safeContent = escapeCurlyForMDX(safeContent);
        // Final safety: normalize stray <br> variants to self-closing even if missed
        safeContent = safeContent
            .replace(/<br\s*>/gi, '<br />')
            .replace(/<br\s*\/\s*>/gi, '<br />');

        const mdxHandlers = {
            mdxJsxFlowElement(h, node) {
                const name = node.name || 'div';
                const props = {};
                if (Array.isArray(node.attributes)) {
                    node.attributes.forEach((attr) => {
                        if (attr.type === 'mdxJsxAttribute' && attr.name) {
                            if (typeof attr.value === 'string') props[attr.name] = attr.value;
                            else if (attr.value && typeof attr.value.value === 'string') props[attr.name] = attr.value.value;
                        }
                    });
                }
                // Let remark-rehype convert children correctly, preserving text and line breaks
                const children = h.all(node);
                return h(node, name, props, children);
            },
            mdxJsxTextElement(h, node) {
                const name = node.name || 'span';
                const props = {};
                if (Array.isArray(node.attributes)) {
                    node.attributes.forEach((attr) => {
                        if (attr.type === 'mdxJsxAttribute' && attr.name) {
                            if (typeof attr.value === 'string') props[attr.name] = attr.value;
                            else if (attr.value && typeof attr.value.value === 'string') props[attr.name] = attr.value.value;
                        }
                    });
                }
                const children = h.all(node);
                return h(node, name, props, children);
            },
        };

        const file = unified()
            .use(remarkParse, { fragment: true })
            .use(remarkMdx)
            .use(remarkGfm)
            .use(remarkFrontmatter)
            .use(remarkDeflist)
            .use(remarkRehype, { allowDangerousHtml: false, handlers: mdxHandlers, passThrough: ['mdxjsEsm','mdxFlowExpression','mdxTextExpression'] })
            .use(rehypeHighlight)
            .use(rehypeReact, {
                createElement,
                Fragment,
                jsx: prod.jsx,
                jsxs: prod.jsxs,
                components: {
                    img: (props) => (
                        <Imager
                            className='image'
                            gitUser={gitUser}
                            gitRepo={gitRepo}
                            gitFile={gitFile}
                            {...props}
                        />
                    ),
                    'dhrift-info': (props) => {
                        const idxStr = props['data-index'] || props['data-Index'] || props['dataindex'];
                        const idx = parseInt(idxStr, 10);
                        const md = infoSegments[idx] || '';
                        const rendered = renderMarkdownToReact(md);
                        return (
                            <div className='info-alert'>
                                <Info text={rendered} />
                            </div>
                        );
                    },
                    JSTerminal: () => <JSTerminal />,
                    htmleditor: (props) => (<HTMLEditorComponent {...props} />),
                    HTMLEditor: (props) => (<HTMLEditorComponent {...props} />),
                    'dhrift-codeeditor': (props) => {
                        const idxStr = props['data-index'] || props['data-Index'] || props['dataindex'];
                        const idx = parseInt(idxStr, 10);
                        const raw = codeEditorSegments[idx] || '';
                        return (
                            <CodeEditor
                                allUploads={allUploads}
                                language={language}
                                setCode={setCode}
                                setEditorOpen={setEditorOpen}
                                setAskToRun={setAskToRun}
                                workshopTitle={workshopTitle}
                                {...props}
                            >
                                {raw}
                            </CodeEditor>
                        );
                    },
                    codeeditor: (props) => (
                        <CodeEditor
                            allUploads={allUploads}
                            language={language}
                            setCode={setCode}
                            setEditorOpen={setEditorOpen}
                            setAskToRun={setAskToRun}
                            workshopTitle={workshopTitle}
                            {...props}
                        />
                    ),
                    CodeEditor: (props) => (
                        <CodeEditor
                            allUploads={allUploads}
                            language={language}
                            setCode={setCode}
                            setEditorOpen={setEditorOpen}
                            setAskToRun={setAskToRun}
                            workshopTitle={workshopTitle}
                            {...props}
                        />
                    ),
                    download: (props) => (
                        <Download workshopTitle={workshopTitle} allUploads={allUploads} {...props} />
                    ),
                    Download: (props) => (
                        <Download workshopTitle={workshopTitle} allUploads={allUploads} {...props} />
                    ),
                    info: (props) => (
                        <div className='info-alert'>
                            <Info text={props.children} />
                        </div>
                    ),
                    Info: (props) => (
                        <div className='info-alert'>
                            <Info text={props.children} />
                        </div>
                    ),
                    // Legacy Secret tag if it slips through (should be placeholder'd above)
                    secret: (props) => (
                        <Secret>{props.children}</Secret>
                    ),
                    Secret: (props) => (
                        <Secret>{props.children}</Secret>
                    ),
                    'dhrift-secret': (props) => {
                        const idxStr = props['data-index'] || props['data-Index'] || props['dataindex'];
                        const idx = parseInt(idxStr, 10);
                        const md = secretSegments[idx] || '';
                        const rendered = renderMarkdownToReact(md);
                        return (
                            <div className='secret'>
                                <SecretComponent text={rendered} />
                            </div>
                        );
                    },
                    jupyter: (props) => (
                        <Jupyter {...props} />
                    ),
                    Jupyter: (props) => (<Jupyter {...props} />),
                    pythonrepl: () => <PythonREPLComponent />,
                    PythonREPL: () => <PythonREPLComponent />,
                    terminal: () => <JSTerminal />,
                    Terminal: () => <JSTerminal />,
                    'dhrift-keywords': (props) => {
                        const idxStr = props['data-index'] || props['data-Index'] || props['dataindex'];
                        const idx = parseInt(idxStr, 10);
                        const raw = keywordsSegments[idx] || '';
                        return <Keywords raw={raw} />;
                    },
                    keywords: (props) => <Keywords {...props} />,
                    Keywords: (props) => <Keywords {...props} />,
                    'dhrift-link': (props) => <LinkComp {...props} />,
                    quiz: (props) => <Quiz {...props} />,
                    Quiz: (props) => <Quiz {...props} />,
                }
            })
            .processSync(safeContent);

        // Ensure a stable container with an array of children
        const root = file.result;
        let topChildren = [];
        if (Array.isArray(root)) {
            topChildren = root;
        } else if (root && root.props && Object.prototype.hasOwnProperty.call(root.props, 'children')) {
            const c = root.props.children;
            topChildren = Array.isArray(c) ? c : (c !== undefined ? [c] : []);
        } else if (root) {
            topChildren = [root];
        }
        // Unwrap a single wrapping <div> if present so h1/h2 appear at top level for page splitting
        if (
            topChildren.length === 1 &&
            topChildren[0] &&
            typeof topChildren[0] === 'object' &&
            topChildren[0].type === 'div' &&
            topChildren[0].props &&
            Object.prototype.hasOwnProperty.call(topChildren[0].props, 'children')
        ) {
            const inner = topChildren[0].props.children;
            topChildren = Array.isArray(inner) ? inner : (inner !== undefined ? [inner] : []);
        }
        return createElement('div', null, ...topChildren);
    } catch (error) {
        console.error('Error compiling markdown:', error);
        return (
            <div className="markdown-error" style={{
                padding: '1rem',
                margin: '1rem 0',
                border: '1px solid #f56565',
                borderRadius: '0.25rem',
                backgroundColor: '#fff5f5',
                color: '#c53030'
            }}>
                <h3>Error rendering content</h3>
                <p>There was a problem rendering this content. Please check the markdown format.</p>
                <details>
                    <summary>Error details</summary>
                    <pre>{error.message}</pre>
                </details>
            </div>
        );
    }
}
