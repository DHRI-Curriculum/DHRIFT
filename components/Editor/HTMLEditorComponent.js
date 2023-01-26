import React, { useRef, useEffect, useState, useContext } from "react";
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
import { html } from "js-beautify";
import { ReactDOM } from "react";


export default function HTMLEditorComponent({ defaultCode = "<!-- Write your HTML here -->", defaultCSS = "/* Write CSS Here */",
    defaultJS = '// Write Javascript Here' }, includeFrames = '[html, css, javascript]') {
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
    const javascript = useRef(defaultJS);
    const code = useRef(defaultCode);
    const css = useRef(defaultCSS);
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
        if (node.type == 'script') {
            var data, scriptContent;
            if (node.children[0] && node.children[0].data) {
                data = node.children[0].data;
            }
            // use AJAX to get script src and then add to frameScripts
            if (node.attribs && node.attribs.src) {
                var xhr = new XMLHttpRequest();
                xhr.open('GET', node.attribs.src, true);
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4) {
                        if (xhr.status == 200) {
                            scriptContent = xhr.responseText;
                            frameScripts.current.push(scriptContent);
                        }
                    }
                }
                xhr.send();
            }
        }
    };

    const options = {
        transform,
    };

    const doParsing = (code) => {
        // const result = ReactHtmlParser(code, options);
        setOutput(result);
    };

    const onChangeHTML = (newValue) => {
        code.current = newValue;
        runAll();
    };

    const outputComponent = (output) => {
        return (
            <div key={outputKey}>
                {output.map((item, index) => {
                    if (typeof item === 'string') {
                        return
                    }
                    return (
                        item
                    )
                })}
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
            <EditorComponent code={code.current} onChange={onChangeHTML} language={'html'} debounce={1000} />)
    }
    const CssPane = () => {
        return (<EditorComponent code={css.current} onChange={onChangeCss} language={'css'} />)
    }
    const JavascriptPane = () => {
        return (<EditorComponent code={javascript.current} onChange={onChangeJavascript} language={'javascript'} debounce={1000} />)
    }

    const panes = [HtmlPane, CssPane, JavascriptPane, FramePane, ConsolePane];


    return (
        <div style={{ height: '80vh', width: '100%' }}>
            <Allotment minSize={90} >
                <Allotment.Pane minSize={100}>
                    <Allotment vertical>
                        <Allotment.Pane minSize={20}>
                            {HtmlPane()}
                        </Allotment.Pane>
                        <Allotment.Pane minSize={10}>
                            {CssPane()}
                        </Allotment.Pane>
                        <Allotment.Pane >
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
                                {ConsolePane()}
                            </Allotment.Pane>
                        </Allotment>
                    </Allotment>
                </Allotment.Pane>
            </Allotment>
        </div>
    );
};
