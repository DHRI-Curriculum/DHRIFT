import React, { useRef, useEffect, useState, useContext } from "react";
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

export default function HTMLEditorComponent({ defaultCode = "<!-- Write your HTML here -->", defaultCSS = "/* Write CSS Here */",
    defaultJS = '// Write Javascript Here' }, includeFrames = '[html, css, javascript]') {

    // check if user has text in local storage
    const memoryCode = window.localStorage.getItem('code') || defaultCode;
    const memoryCss = window.localStorage.getItem('css') || defaultCSS;
    const memoryJavascript = window.localStorage.getItem('javascript') || defaultJS;

    const [output, setOutput] = useState([]);
    const [frameKey, setFrameKey] = useState(Math.random());
    const [outputKey, setOutputKey] = useState(Math.random());
    const [frameReady, setFrameReady] = useState(false);
    const [frameDoc, setFrameDoc] = useState(null);
    const [frameWindow, setFrameWindow] = useState(null);
    const [logs, setLogs] = useState([]);
    const [contentRef, setContentRef] = useState(null);
    const [toShow, setToShow] = useState(false);
    const [initialContent, setInitialContent] = useState('<!DOCTYPE html><html><head></head><body><div id="mountHere"></div></body></html>');
    const frameScripts = useRef([]);
    const javascript = useRef(memoryJavascript);
    const code = useRef(memoryCode);
    const css = useRef(memoryCss);
    const consoleRef = useRef(null);


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

    const transform = (node, index) => {
        if (node.type === 'tag' && node.name === 'img') {
            node.attribs = {
                ...node.attribs,
                crossorigin: 'anonymous'
            };
        }
        return node;
    };

    const options = {
        transform,
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
        }, 1000);
    };

    const onChangeJavascript = (newValue) => {
        javascript.current = newValue;
        runAll();
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

    const downloadButton = () => {
        return (
            <button onClick={downloadAll} style={{ position: 'relative', marginTop:'10px', marginLeft:'10px' }}>Download</button>
        )
    }

    return (
        <div style={{ height: '100vh', width: '100%' }}>
            {downloadButton()}
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