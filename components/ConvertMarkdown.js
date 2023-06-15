import Markdown, { compiler } from 'markdown-to-jsx';
import { useState, useEffect } from 'react';
import QuizComponent from './QuizComponent';
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'
import Image from 'next/image'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import PythonREPLComponent from './PythonREPLComponent';
import TerminalComponent from './TerminalComponent';
import EditorWithTabsComponent from './Editor/EditorWithTabs';
import InterpreterComponent from './Editor/InterpreterComponent';
import Download from './Download';
import JSTerminal from './Editor/JSTerminal';
import Info from './Info';
import {Secret} from './Secret';
import HTMLEditorComponent from './Editor/HTMLEditorComponent';
import { renderToStaticMarkup } from 'react-dom/server';
import he from 'he';
var beautify = require('js-beautify');
var beautifyHTML = require('js-beautify').html;


const Code = ({ className, children }) => {
    const [isShown, setIsShown] = useState(false);
    // using hljs to highlight code
    const html = children.props.children;
    const childClassName = children.props.className;
    if (childClassName !== undefined) {
        const language = childClassName.replace('lang-', '');
        const highlighted = hljs.highlight(html, { language: language, ignoreIllegals: true });
        const getLang = hljs.getLanguage(highlighted.language).name
        return (
            <div className="code-block"
                onMouseEnter={() => setIsShown(true)}
                onMouseLeave={() => setIsShown(false)}>
                <pre className={className + ' ' + language}>
                    {/* {isShown && (
                        <>
                            {language && <span className="language">{getLang}</span>}
                        </>
                    )} */}
                    <code className={className}
                        dangerouslySetInnerHTML={{ __html: highlighted.value }}>
                    </code>
                </pre>
            </div>
        );
    }
    else {
        return (
            <pre className={className}>
                <code className={className} dangerouslySetInnerHTML={{ __html: html }}></code>
            </pre>
        );
    }
}

const Imager = ({ className, ...props }) => {
    const newProps = { ...props };
    const imageSource = newProps.src
    return (
        <div className="image-container">
            <Zoom>
                <div className='markdown-image-container' >
                    <Image
                        className='markdown-image'
                        src={imageSource}
                        alt={newProps.alt}
                        layout='fill'
                        objectFit='cover'
                    />
                </div>
            </Zoom>
        </div>
    );
}

const CodeEditor = ({ children, ...props }) => {
    var codeText
    if (children) {
        if (children.length > 0) {
            if (typeof children[0] === 'object') {
                codeText = children[0].props.children.join('');
            }
            else {
                codeText = children.join('');
            }
            return (
                <div>
                    <InterpreterComponent language={props.language} defaultCode={codeText} {...props} />
                </div>
            )
        } else {
            codeText = children.join('');
        }
        return (
            <div>
                <InterpreterComponent language={props.language} defaultCode={codeText} {...props} />
            </div>
        )
    } else {
        return (
            <div>
                <InterpreterComponent language={props.language} {...props} />
            </div>
        )
    }
}

const EditorWithTabs = ({ className, children }) => {
    const codeText = children.join('');
    return (
        <div>
            <EditorWithTabsComponent defaultCode={codeText} />
        </div>
    )
}

const PythonREPL = ({ className, children }) => {
    return (
        <div>
            <PythonREPLComponent />
        </div>
    )
}

const Terminal = ({ className, children }) => {
    return (
        <div>
            <TerminalComponent />
        </div>
    )
}


const Quiz = ({ className, children }) => {
    return (
        <div>
            <QuizComponent>
                {children}
            </QuizComponent>
        </div>
    )
}

const HTMLEditor = ({ className, children }) => {
    var html, css;
    for (var i = 0; i < children.length; i++) {
        if (children[i].type === 'html') {
            // react components converted to a string
            html = renderToStaticMarkup(children[i].props.children);
            html = beautifyHTML(html, { indent_size: 2 });
        }
        if (children[i].type === 'javascript') {
            var javascript = [];
            // javascript = renderToStaticMarkup(children[i].props.children.join(''));
            // for line in children[i].props.children {
            for (var j = 0; j < children[i].props.children.length; j++) {
                // render as pure text instead of react components
                var line = renderToStaticMarkup(children[i].props.children[j]);
                line = line.replace(/<\/?code>/g, '');
                line = he.decode(line);
                if (line !== undefined) {
                    javascript.push(line);
                }
            }
            javascript = beautify.js(javascript.join(''), { indent_size: 2 });

        }
        if (children[i].type === 'css') {
            css = renderToStaticMarkup(children[i].props.children.join(''));
        }
    }
    return (
        <div>
            <HTMLEditorComponent defaultCode={html} defaultJS={javascript} defaultCSS={css} />
        </div>
    )
}

const InfoAlert = ({ className, children }) => {
    return (
        <div className="info-alert">
            <Info text={children} /> 
        </div>
    )
}

export default function ConvertMarkdown(markdown, uploads, workshop, setCode, setEditorOpen, setAskToRun) {
    return (
        compiler(markdown,
            {
                overrides: {
                    pre: {
                        component: Code,
                        props: {
                            className: 'hljs'
                        }
                    },
                    img: {
                        component: Imager,
                        props: {
                            className: 'image',
                        }
                    },
                    CodeEditor: {
                        component: CodeEditor,
                        props: {
                            allUploads: uploads,
                            // language is given or python is default
                            language: 'python',
                            setCode: setCode,
                            setEditorOpen: setEditorOpen,
                            setAskToRun: setAskToRun,
                            workshop: workshop,
                        }
                        
                    },
                    Download: {
                        component: Download,
                        props: {
                            workshop: workshop,
                            allUploads: uploads,
                        }
                    },
                    Info: {
                        component: InfoAlert,
                        props: {
                            className: 'info-alert',
                        }
                    },
                    Quiz,
                    PythonREPL,
                    Terminal,
                    EditorWithTabs,
                    JSTerminal,
                    HTMLEditor,
                    Secret,
                }

            })
    );
}
