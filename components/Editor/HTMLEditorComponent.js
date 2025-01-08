import React, { useRef, useEffect, useState, useContext, useCallback } from "react";
// import ReactHtmlParser, { Options } from "react-html-parser";
// import convertHtmlToReact from '@hedgedoc/html-to-react';
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
    includeFrames = '[html, css, javascript]',
    isActive = true
}) {
    // State initialization
    const [frameKey, setFrameKey] = useState(Math.random());
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
            min-height: 100%;
            width: 100%;
            background: white;
        }
        body {
            position: relative;
        }
    `;

    const initialContent = `
        <!DOCTYPE html>
        <html>
            <head>
                <base target="_parent">
                <style>
                    ${frameStyle}
                </style>
                <style id="user-css"></style>
            </head>
            <body>
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
        if (frameReady && isActive) {
            updateFrame();
        }
    }, [javascript.current, frameReady, isActive]);

    const scriptQueue = useRef([]);
    const scriptRunning = useRef(false);

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
        if (frameReady && isActive) {
            consoleHook();
            runAll();
        }
    }, [frameReady, isActive]);

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

    const onChangeHTML = (newValue) => {
        code.current = newValue;
        runAll();
    };

    const frameEval = (allCode) => {
        if (frameWindow) {
            try {
                const codeToEval = frameScripts.current.join('\n') + '\n' + allCode;
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
        }, 100);
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
        if (!isActive) return;
        if (frameWindow && frameDoc) {
            // Update CSS
            const styleEl = frameDoc.getElementById('user-css');
            if (styleEl) {
                styleEl.textContent = css.current;
            }

            // Update HTML
            frameDoc.body.innerHTML = code.current;
            
            // Fix elements
            // Images
            const images = frameDoc.getElementsByTagName('img');
            Array.from(images).forEach(img => {
                img.crossOrigin = 'anonymous';
                img.loading = 'lazy';
                img.referrerPolicy = 'no-referrer';
            });

            // Iframes
            const iframes = frameDoc.getElementsByTagName('iframe');
            Array.from(iframes).forEach(iframe => {
                iframe.sandbox = 'allow-scripts allow-same-origin allow-forms';
                iframe.loading = 'lazy';
                iframe.referrerPolicy = 'no-referrer';
            });

            // Scripts
            const scripts = frameDoc.getElementsByTagName('script');
            Array.from(scripts).forEach(script => {
                script.defer = true;
                script.referrerPolicy = 'no-referrer';
                if (!script.nonce) {
                    script.nonce = crypto.randomUUID();
                }
            });

            // Forms
            const forms = frameDoc.getElementsByTagName('form');
            Array.from(forms).forEach(form => {
                form.target = '_self';
                form.rel = 'noopener noreferrer';
            });

            // External Links
            const links = frameDoc.getElementsByTagName('a');
            Array.from(links).forEach(link => {
                if (link.href && link.href.startsWith('http')) {
                    link.target = '_blank';
                    link.rel = 'noopener noreferrer';
                }
            });

            // Update JavaScript
            setTimeout(() => {
                frameEval(javascript.current);
                // set the user local storage
                window.localStorage.setItem('code', code.current);
                window.localStorage.setItem('css', css.current);
                window.localStorage.setItem('javascript', javascript.current);
            }, 100);
        }
    }

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
                    initialContent={initialContent}
                    mountTarget='body'
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
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
                                return null;
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
                            <Allotment.Pane minSize={140}>
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
}
