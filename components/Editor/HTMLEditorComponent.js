import React, { useRef, useEffect, useState, useContext, useCallback } from "react";
// import ReactHtmlParser, { Options } from "react-html-parser";
// import convertHtmlToReact from '@hedgedoc/html-to-react';
import parse from 'html-react-parser';
import dynamic from "next/dynamic";
const EditorComponent = dynamic(
    () => import("./EditorComponent"),
    { ssr: false }
);
const Frame = dynamic(
    () => import('react-frame-component'),
    { ssr: false }
);
import { FrameContextConsumer } from "react-frame-component";
import "allotment/dist/style.css";
import { Console, Hook, Unhook } from 'console-feed';
import JSZip from 'jszip';
import { saveAs } from "file-saver";
import debounce from 'lodash.debounce';

export default function HTMLEditorComponent({ 
    defaultCode = "<!-- Write your HTML here -->", 
    defaultCSS = "/* Write CSS Here */",
    defaultJS = '// Write Javascript Here',
    includeFrames = '[html, css, javascript]' 
}) {
    // State initialization
    const [output, setOutput] = useState([]);
    const [frameKey, setFrameKey] = useState(Math.random());
    const [outputKey, setOutputKey] = useState(Math.random());
    const [frameReady, setFrameReady] = useState(false);
    const [frameWindow, setFrameWindow] = useState(null);
    const [frameDoc, setFrameDoc] = useState(null);
    const [logs, setLogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [toShow, setToShow] = useState(false);

    // Refs initialization
    const code = useRef(window?.localStorage?.getItem('code') || defaultCode);
    const css = useRef(window?.localStorage?.getItem('css') || defaultCSS);
    const javascript = useRef(window?.localStorage?.getItem('javascript') || defaultJS);
    const consoleRef = useRef(null);
    const frameScripts = useRef([]);
    const contentRef = useRef(null);

    // Frame initialization
    const frameStyle = `
        html, body { 
            margin: 0; 
            padding: 0;
            height: 100%;
            width: 100%;
        }
        #mountHere {
            height: 100%;
            width: 100%;
        }
    `;

    const initialContent = `
        <!DOCTYPE html>
        <html>
            <head>
                <style>${frameStyle}</style>
            </head>
            <body>
                <div id="mountHere"></div>
            </body>
        </html>
    `;

    // Memoized handlers
    const isExecuting = useRef(false);
    const executionQueue = useRef([]);

    const executeJavaScript = useCallback(async (code) => {
        if (isExecuting.current) {
            executionQueue.current.push(code);
            return;
        }
        
        isExecuting.current = true;
        try {
            await frameEval(code);
        } catch (error) {
            console.error('Execution error:', error);
        } finally {
            isExecuting.current = false;
            if (executionQueue.current.length > 0) {
                const nextCode = executionQueue.current.shift();
                executeJavaScript(nextCode);
            }
        }
    }, [frameWindow]);

    const updateFrame = useCallback(debounce(() => {
        if (!frameWindow || !frameReady) return;
        executeJavaScript(javascript.current);
    }, 500), [frameWindow, frameReady]);

    useEffect(() => {
        return () => {
            executionQueue.current = [];
            isExecuting.current = false;
        };
    }, []);

    useEffect(() => {
        if (frameReady) {
            updateFrame();
        }
    }, [javascript.current, frameReady]);

    const scriptQueue = useRef([]);
    const scriptRunning = useRef(false);

    const parserOptions = {
        replace: (domNode) => {
            if (domNode.type === 'tag' && domNode.name === 'img') {
                const props = { ...domNode.attribs, crossorigin: 'anonymous' };
                return <img {...props} />;
            }
        }
    };

    const consoleHook = () => {
        setTimeout(() => {
            setToShow(true);
        }, 20);
        Hook(
            consoleRef.current,
            (log) => setLogs((currLogs) => [...currLogs, log]),
            false
        )
        return () => Unhook(consoleRef.current);
    }

    useEffect(() => {
        if (frameReady) {
            consoleHook();
            runAll();
        }
    }, [frameReady]);


    // all this below can be wrapped into useAllotment hook or smth like that
    const isMountedRef = useRef(false);
    const [Allotment, setAllotment] = useState(null);
    useEffect(() => {
        isMountedRef.current = true;
        import("allotment")
            .then((mod) => {
                if (!isMountedRef.current) {
                    return;
                }
                setAllotment(mod.Allotment);
            })
            .catch((err) =>
                console.error(err, `could not import allotment ${err.message}`)
            );
        return () => {
            isMountedRef.current = false;
        };
    }, []);
    if (!Allotment) {
        return <div>loading...</div>;
    }
    // end of hook

    const options = {
        replace: (domNode) => {
            if (!domNode || !domNode.name) return;

            try {
                const baseAttribs = domNode.attribs || {};
                
                switch (domNode.name) {
                    case 'img':
                        return <img 
                            {...baseAttribs} 
                            crossorigin="anonymous"
                            loading="lazy"
                            referrerPolicy="no-referrer" 
                        />;
                    
                    case 'script':
                        return <script 
                            {...baseAttribs}
                            nonce={crypto.randomUUID()}
                            defer
                            referrerPolicy="no-referrer"
                        />;
                    
                    case 'link':
                        return <link 
                            {...baseAttribs}
                            crossorigin="anonymous"
                            referrerPolicy="no-referrer"
                        />;
                    
                    case 'iframe':
                        return <iframe 
                            {...baseAttribs}
                            sandbox="allow-scripts allow-same-origin allow-forms"
                            loading="lazy"
                            referrerPolicy="no-referrer"
                        />;
                    
                    case 'form':
                        return <form 
                            {...baseAttribs}
                            target="_self"
                            rel="noopener noreferrer"
                        />;
                    
                    case 'a':
                        return <a 
                            {...baseAttribs}
                            target="_blank"
                            rel="noopener noreferrer"
                        />;
                    
                    case 'object':
                    case 'embed':
                    case 'applet':
                        return <div className="blocked-content">External content blocked for security</div>;
                    
                    default:
                        return undefined;
                }
            } catch (error) {
                console.error('Parser error:', error);
                return <div className="parse-error">Error parsing content</div>;
            }
        }
    };

    const doParsing = (code) => {
        const result = parse(code, options);
        setOutput(result);
    };

    const onChangeHTML = (newValue) => {
        code.current = newValue;
        runAll();
    };

    const outputComponent = (output) => {
        return (
            <div key={outputKey}>
                {output}
                {/* {output.map((item, index) => {
                    if (typeof item === 'string') {
                        return
                    }
                    return (
                        item
                    )
                })} */}
            </div>
        )
    }

    const frameEval = (allCode) => {
        if (frameWindow) {
            try {
                const parsedContent = parse(allCode, parserOptions);
                const codeToEval = frameScripts.current.join('\n') + '\n' + parsedContent;
                frameWindow.eval(codeToEval);
            } catch (e) {
                frameWindow.console.error(e);
            }
        }
    }

    const onChangeCss = (newValue) => {
        css.current = newValue;
        setTimeout(() => {
            runAll();
        }, 1000);
    };

    const onChangeJavascript = (newValue) => {
        javascript.current = newValue;
        runAll();
    };

    const clearPreviousScripts = () => {
        if (frameDoc) {
            const scripts = frameDoc.getElementsByTagName('script');
            Array.from(scripts).forEach(script => script.remove());
        }
    };

    const runScriptQueue = async () => {
        if (scriptRunning.current || scriptQueue.current.length === 0) return;
        
        scriptRunning.current = true;
        try {
            const script = scriptQueue.current.shift();
            await frameEval(script);
        } catch (error) {
            console.error('Script execution error:', error);
        } finally {
            scriptRunning.current = false;
            if (scriptQueue.current.length > 0) {
                runScriptQueue();
            }
        }
    };

    const runAll = () => {
        if (frameWindow && frameDoc) {
            setOutputKey(Math.random());
            doParsing(code.current);
            setTimeout(() => {
                frameEval(javascript.current);
                // set the user local storage
                window.localStorage.setItem('code', code.current);
                window.localStorage.setItem('css', css.current);
                window.localStorage.setItem('javascript', javascript.current);
            }, 2000);
        }
    }

    const iFrameStyle = <style>
        {css.current}
    </style>;

    const frameHead = [iFrameStyle];

    const FramePane = () => {
        return (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                }}>
                <Frame
                    ref={contentRef}
                    key={frameKey}
                    head={frameHead}
                    initialContent={initialContent}
                    mountTarget='#mountHere'
                    style={{
                        width: "100%",
                        height: "100%",
                        background: "white",
                    }}
                >
                    <FrameContextConsumer>
                        {
                            // Callback is invoked with iframe's window and document instances
                            ({ document, window }) => {
                                setFrameWindow(window);
                                setFrameDoc(document);
                                setFrameReady(true);
                                consoleRef.current = window.console;
                                return (
                                    <>
                                        {outputComponent(output)}
                                    </>
                                )
                            }
                        }
                    </FrameContextConsumer>
                </Frame>
            </div>
        )
    }

    const ConsolePane = () => {
        return (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    background: "rgba(0, 0, 0, 0.87)",
                }}
            >
                {toShow && <Console logs={logs} variant="dark" />}
            </div>
        )
    }

    const HtmlPane = () => {
        return (
            <EditorComponent code={code.current} onChange={onChangeHTML} language={'html'} debounce={1000} height={'100%'} />)
    }
    const CssPane = () => {
        return (<EditorComponent code={css.current} onChange={onChangeCss} language={'css'} height={'100%'} />)
    }
    const JavascriptPane = () => {
        return (<EditorComponent code={javascript.current} onChange={onChangeJavascript} language={'javascript'} debounce={1000} height={'100%'} />)
    }

    // download html, css, and javascript in a zip file
    const downloadAll = () => {
        const htmlAdded = '<!DOCTYPE html><html><head><style>' + css.current + '</style></head><body>' + code.current + '<script>' + javascript.current + '</script></body></html>';
        // const htmlBlob = new Blob([code.current], { type: 'text/html' });
        // const cssBlob = new Blob([css.current], { type: 'text/css' });
        // const javascriptBlob = new Blob([javascript.current], { type: 'text/javascript' });
        const htmlBlob = new Blob([htmlAdded], { type: 'text/html' });
        saveAs(htmlBlob, 'webpage.html');
    }

    const downloadFiles = () => {
        // Create HTML with external references
        const htmlContent = `<!DOCTYPE html>
<html>
<head>
   
    <link rel="stylesheet" href="./styles.css">
</head>
<body>
${code.current}
<script src="./script.js"></script>
</body>
</html>`;

        // Create individual file blobs
        const htmlFile = new Blob([htmlContent], { type: 'text/html' });
        const cssFile = new Blob([css.current], { type: 'text/css' });
        const jsFile = new Blob([javascript.current], { type: 'text/javascript' });

        // Download functions
        const downloadHTML = () => saveAs(htmlFile, 'index.html');
        const downloadCSS = () => saveAs(cssFile, 'styles.css');
        const downloadJS = () => saveAs(jsFile, 'script.js');

        // Download all files
        downloadHTML();
        downloadCSS();
        downloadJS();
    };

    const DownloadButtons = () => {
        return (
            <div style={{ margin: '10px' }}>
                <button onClick={downloadFiles}>
                    Download All Files (index.html, styles.css, script.js)
                </button>
            </div>
        );
    };

    return (
        <div style={{ height: '100vh', width: '100%' }}>
            <DownloadButtons />
            <Allotment minSize={90} >
                <Allotment.Pane minSize={100}>
                    <Allotment vertical>
                        <Allotment.Pane minSize={20}>
                            <div style={{ color: 'white', paddingLeft: '10px' }}>HTML</div>
                            {HtmlPane()}
                        </Allotment.Pane>
                        <Allotment.Pane minSize={10}>
                            <div style={{ color: 'white', paddingLeft: '10px' }}>CSS</div>
                            {CssPane()}
                        </Allotment.Pane>
                        <Allotment.Pane >
                            <div style={{ color: 'white', paddingLeft: '10px' }}>Javascript</div>
                            {JavascriptPane()}
                        </Allotment.Pane>
                    </Allotment>
                </Allotment.Pane>
                <Allotment.Pane>
                    <Allotment>
                        <Allotment vertical>
                            <Allotment.Pane minSize={140}
                            >
                                {FramePane()}
                            </Allotment.Pane>
                            <Allotment.Pane className={'JS-console'}>
                            <div style={{ color: 'white', paddingLeft: '10px' }}>Console</div>
                                {ConsolePane()}
                            </Allotment.Pane>
                        </Allotment>
                    </Allotment>
                </Allotment.Pane>
            </Allotment>
        </div>
    );
};