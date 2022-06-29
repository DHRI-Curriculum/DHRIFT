import Markdown, { compiler } from 'markdown-to-jsx';
import { useState, useEffect } from 'react';
import QuizComponent from './QuizComponent';
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'
import Image from 'next/future/image'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import PythonREPLComponent from './PythonREPLComponent';
import TerminalComponent from './TerminalComponent';
import EditorWithTabsComponent from './Editor/EditorWithTabs';
import InterpreterComponent from './Editor/InterpreterComponent';
import Download from './Download';
import JSTerminal from './Editor/JSTerminal';

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
                    {isShown && (
                        <>
                            {language && <span className="language">{getLang}</span>}
                        </>
                    )}
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
    if (children) {
        if (children.length > 0) {
            if (typeof children[0] === 'object') {
                console.log('children', children)
                const codeText = children[0].props.children.join('');
                return (
                    <div>
                        <InterpreterComponent language={props.language} defaultCode={codeText} {...props} />
                    </div>
                )
            }else{
                const codeText = children.join('');
                return (
                    <div>
                        <InterpreterComponent language={props.language} defaultCode={codeText} {...props} />
                    </div>
                )
            }
        } else {
            console.log('HERE', children)
            const codeText = children.join('');
            return (
                <div>
                    <InterpreterComponent language={props.language} defaultCode={codeText} {...props} />
                </div>
            )
        }
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

const Boxed = ({ children, ...props }) => {
    var color = props.color || '#d5222c';
    return (
        <div className="boxed"
        style= {{
            padding: '1rem',
            border: '3px solid ' + color,
            boxShadow: color + ' 8px 8px 0px' 
        }}>
            {children}
        </div>
    )
}

const ClicktoReveal = ({ children, ...props }) => {
    // use click hook to reveal
    const [isShown, setIsShown] = useState(false);
    var color = props.color || '#9abc4f';
    const beforeReveal = (
        <div>{children[0]} (click to reveal)</div>
    )
    return (
        <div className="boxed"
        style= {{
            padding: '1rem',
            border: '3px solid ' + color,
            boxShadow: color + ' 8px 8px 0px',
            marginTop: '2rem',
            cursor: 'pointer'
        }}
        onClick={() => setIsShown(!isShown)}>
            {isShown ? children : beforeReveal}
        </div>
    )
}

export default function ConvertMarkdown(markdown, uploads, workshop) {
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
                        }
                    },
                    Download: {
                        component: Download,
                        props: {
                            workshop: workshop,
                            allUploads: uploads,
                        }
                    },
                    Quiz,
                    PythonREPL,
                    Terminal,
                    EditorWithTabs,
                    JSTerminal,
                    Boxed,
                    Reveal: ClicktoReveal,
                }

            })

    );
}
