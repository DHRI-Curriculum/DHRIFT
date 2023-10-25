import Markdown, { compiler } from 'markdown-to-jsx';
import { useState, useEffect } from 'react';
import QuizComponent from './QuizComponent';
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'
import Image from 'next/image'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import PythonREPLComponent from '../Editor/PythonREPLComponent';
import EditorWithTabsComponent from '../Editor/EditorWithTabs';
import CodeRunBox from '../Editor/CodeRunBox';
import Download from './Download';
import JSTerminal from '../Editor/JSTerminal';
import Info from './Info';
import SecretComponent from './SecretComponent';
// import HTMLEditorComponent from './Editor/HTMLEditorComponent';
// import { renderToStaticMarkup } from 'react-dom/server';
// import he from 'he';


export default function ConvertMarkdown(markdown, uploads, workshopTitle, language, setCode, setEditorOpen, setAskToRun, gitUser, gitRepo, gitFile, setJupyterSrc) {


    const Imager = ({ className, ...props }) => {
        let newProps = { ...props };
        const [src, setSrc] = useState(newProps.src);
        const builtURL = `https://raw.githubusercontent.com/${gitUser}/${gitRepo}/main${newProps.src}`
        return (
            <div className="image-container"
                style={{
                    position: 'relative',
                }}
            >
                <Zoom>
                    <div className='markdown-image-container'
                        style={{
                            position: 'relative',
                            // height: '400px',
                            // width: '100%',
                        }}
                    >
                        <Image
                            className='markdown-image'
                            // fill={true}
                            width={0}
                            height={0}
                            src={src}
                            alt={newProps.alt}
                            onError={() => setSrc(builtURL)}
                            style={{ width: '100%', height: 'auto' }}
                        />
                    </div>
                </Zoom>
            </div>
        )
    }

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


    const CodeEditor = ({ children, ...props }) => {
        var codeText = '';
        if (children) {
            if (children.length > 0) {
                // if any of the children are an object (i.e. a react component)
                // then we need to join the children together
                // if (typeof children[0] === 'object') {
                //     codeText = children[0].props.children.join('');
                // }
                // else {
                //     codeText = children.join('');
                // }
                children.forEach((child) => {
                    if (typeof child === 'object') {
                        child.props.children.forEach((line) => {
                            if (typeof line === 'object') {
                                codeText += line.props.children.join('');
                            }
                            codeText += line;
                        })
                    }
                    else {
                        codeText += child;
                    }
                })

                return (
                    <div>
                        <CodeRunBox language={props.language} defaultCode={codeText} {...props} />
                    </div>
                )
            }
            else {
                codeText = children.join('');
            }
            return (
                <div>
                    <CodeRunBox language={props.language} defaultCode={codeText} {...props} />
                </div>
            )
        } else {
            return (
                <div>
                    <CodeRunBox language={props.language} {...props} />
                </div>
            )
        }
    }

    // const Downloader = ({ className, children, ...props }) => {
    //     if (uploads == undefined) return null;
    //     return (
    //         <div>
    //             <Download {...props} />
    //         </div>
    //     )
    // }


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
                <JSTerminal />
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

    // const HTMLEditor = ({ className, children }) => {
    //     var html, css;
    //     for (var i = 0; i < children.length; i++) {
    //         if (children[i].type === 'html') {
    //             // react components converted to a string
    //             html = renderToStaticMarkup(children[i].props.children);
    //             html = beautifyHTML(html, { indent_size: 2 });
    //         }
    //         if (children[i].type === 'javascript') {
    //             var javascript = [];
    //             // javascript = renderToStaticMarkup(children[i].props.children.join(''));
    //             // for line in children[i].props.children {
    //             for (var j = 0; j < children[i].props.children.length; j++) {
    //                 // render as pure text instead of react components
    //                 var line = renderToStaticMarkup(children[i].props.children[j]);
    //                 line = line.replace(/<\/?code>/g, '');
    //                 line = he.decode(line);
    //                 if (line !== undefined) {
    //                     javascript.push(line);
    //                 }
    //             }
    //             javascript = beautify.js(javascript.join(''), { indent_size: 2 });

    //         }
    //         if (children[i].type === 'css') {
    //             css = renderToStaticMarkup(children[i].props.children.join(''));
    //         }
    //     }
    //     return (
    //         <div>
    //             <HTMLEditorComponent defaultCode={html} defaultJS={javascript} defaultCSS={css} />
    //         </div>
    //     )
    // }

    const InfoAlert = ({ className, children }) => {
        return (
            <div className="info-alert">
                <Info text={children} />
            </div>
        )
    }

    const Secret = ({ className, children }) => {
        return (
            <div>
                <SecretComponent text={children} />
            </div>
        )
    }

    if (!markdown) return null;
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
                            gitUser: gitUser,
                            gitRepo: gitRepo,
                            gitFile: gitFile,
                        }
                    },
                    CodeEditor: {
                        component: CodeEditor,
                        props: {
                            allUploads: uploads,
                            language: language,
                            setCode: setCode,
                            setEditorOpen: setEditorOpen,
                            setAskToRun: setAskToRun,
                            workshopTitle: workshopTitle,
                        },
                        options: {
                            forceInline: true,
                        }
                    },
                    Download: {
                        component: Download,
                        props: {
                            workshopTitle: workshopTitle,
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
                    Secret
                    // HTMLEditor,

                }

            })
    );
}