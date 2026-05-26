import { useRef, useState, useReducer, useEffect } from "react";
import dynamic from "next/dynamic";
const EditorComponent = dynamic(
    () => import("./EditorComponent"),
    { ssr: false }
);
import EditorTopbar from "./EditorTopbar";
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';


export default function JSEditorComponent({ defaultCode = '// Write JavaScript Here', scrollContainerRef, ...props }) {
    const [JScode, setJSCode] = useState(defaultCode);
    const [runningCode, setRunningCode] = useState(false);
    const [outputVersion, setOutputVersion] = useState(0);
    const outputRef = useRef(null);
    const consoleRef = useRef(null);
    const [error, setError] = useState(null);
    const [isoutput, setIsoutput] = useState(false);
    const [isError, setIsError] = useState(false);
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
    
    // Update JScode when defaultCode changes
    useEffect(() => {
        if (defaultCode) {
            setJSCode(defaultCode);
        }
    }, [defaultCode]);


    const allSnippets = props.allUploads;
    // chosenSnippets is a string of files separated by commas, make it an array
    const chosenSnippets = typeof props.snippets === 'string' ? props.snippets.split(',') : [];
    var filteredSnippets = [];

    // for item in chosenSnippets
    // if item in slug of item in allSnippets
    // add item to filteredSnippets
    if (chosenSnippets != undefined) {
        chosenSnippets.forEach(snippet => {
            const currentFile = allSnippets.find(file => file.slug === snippet.trim());
            if (currentFile != undefined) {
                filteredSnippets.push(currentFile);
            }
        })
    }

    function closeOutput() {
        setIsoutput(false);
    }

    function closeError() {
        setIsError(false);
    }


    var JSoutput = function (value) {
        if (value === null) {
            return "null";
        }
        if (value === undefined) {
            return "undefined";
        }
        const type = typeof value;
        if (type === "string") {
            return value;
        }
        if (type === "number" || type === "boolean" || type === "symbol" || type === "bigint") {
            return String(value);
        }
        if (type === "function") {
            return `[Function: ${value.name || 'anonymous'}]`;
        }
        if (type === "object") { // This includes arrays
            if (value instanceof Error) {
                return value.stack ? value.stack : value.toString();
            }
            try {
                // Attempt to stringify. This handles arrays and plain objects well.
                return JSON.stringify(value, null, 2);
            } catch (e) {
                // Fallback for complex objects that JSON.stringify can't handle (e.g., circular refs, DOM elements)
                if (Array.isArray(value)) {
                    // For arrays with problematic content, provide a basic representation
                    return `[Array of ${value.length} items]`;
                }
                // For other non-stringifiable objects
                return "[Object]"; 
            }
        }
        // Fallback for any other unexpected types
        return String(value);
    };

    var writeln = function (str) {
        outputRef.current += JSoutput(str) + "\n";
    }

    var JSrun = function () {
        var str;
        setIsError(false);
        setError(null);
        setIsoutput(false);
        setRunningCode(true);
        outputRef.current = "";
        consoleRef.current = "";
        try {
            var loggedLines = []; // Store arrays of arguments for each log call
            // store logged values in loggedLines array
            var log = function (...args) { // Capture all arguments for a single console.log call
                loggedLines.push(args);
            };
            // capture console.log output 
            console.oldLog = console.log;
            console.log = log;

            var result = eval(JScode);

            // Process loggedLines
            for (var i = 0; i < loggedLines.length; i++) {
                // Join arguments of a single log call with spaces, processed by JSoutput
                const lineOutput = loggedLines[i].map(arg => JSoutput(arg)).join(' ');
                consoleRef.current += lineOutput + "\n";
            }

            writeln(result);
            forceUpdate();
            setIsoutput(true);
            setOutputVersion((v) => v + 1);
        } catch (e) {
            setError(e);
            setIsError(true);
        } finally {
            try { if (console.oldLog) console.log = console.oldLog; } catch (_) {}
        }
        if (str != undefined) { outputRef.current += str; }
        // console.log has already been restored
        setRunningCode(false);
    }

    const onChange = (newValue) => {
        setJSCode(newValue);
    };
    // Auto-run parity with Python when askToRun is true
    useEffect(() => {
        if (props.askToRun === true) {
            JSrun();
            if (props.setAskToRun) props.setAskToRun(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.askToRun]);
    const height = props.height ? props.height : '100%';

    const [isResizing, setIsResizing] = useState(false);
    const [editorRatio, setEditorRatio] = useState(0.7);
    const containerRef = useRef(null);

    useEffect(() => {
        const onMove = (e) => {
            if (!isResizing || !containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const y = e.clientY - rect.top;
            const ratio = Math.max(0.2, Math.min(0.9, y / rect.height));
            setEditorRatio(ratio);
            e.preventDefault();
        };
        const onUp = () => setIsResizing(false);
        if (isResizing) {
            window.addEventListener('mousemove', onMove);
            window.addEventListener('mouseup', onUp, { once: true });
        }
        return () => {
            window.removeEventListener('mousemove', onMove);
        };
    }, [isResizing]);

    const showOutput = isoutput || isError || !!consoleRef.current;
    const outDivRef = useRef(null);
    useEffect(() => {
        if (!showOutput || !outDivRef.current) return;
        const outEl = outDivRef.current;
        const container = (scrollContainerRef && scrollContainerRef.current) || document.getElementById('drawer-editor') || outEl.closest('.drawer-editor');
        const scrollToChild = () => {
            if (!container) return;
            try {
                const cRect = container.getBoundingClientRect();
                const oRect = outEl.getBoundingClientRect();
                const y = container.scrollTop + (oRect.top - cRect.top);
                container.scrollTo({ top: Math.max(0, y - 56), behavior: 'smooth' });
            } catch (_) {
                outEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        };
        requestAnimationFrame(() => setTimeout(scrollToChild, 0));
    }, [showOutput, outputVersion, runningCode]);
    const editorFlexStyle = showOutput
        ? { flex: `0 0 ${Math.round(editorRatio * 100)}%`, minHeight: 0 }
        : { flex: '1 1 auto', minHeight: 0 };
    const outputFlexStyle = showOutput ? { flex: `0 0 ${Math.round((1 - editorRatio) * 100)}%`, minHeight: 0 } : {};

    return (
        <div ref={containerRef} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div className="editorContainer" style={{ ...editorFlexStyle, display: 'flex', flexDirection: 'column' }}>
                <EditorTopbar
                    spinnerNeeded={runningCode}
                    snippets={filteredSnippets}
                    run={JSrun}
                    language='JavaScript'
                    defaultCode={defaultCode}
                    setCode={setJSCode}
                    {...props}
                />
                <div style={{ flex: 1, minHeight: 0, width: '100%', display: 'flex' }}>
                    <EditorComponent
                        code={JScode}
                        onChange={onChange}
                        language={'javascript'}
                        height={'100%'}
                        {...props}
                    />
                </div>
            </div>
            {showOutput && (
                <>
                <div
                    role="separator"
                    aria-orientation="horizontal"
                    className="editor-separator"
                    onMouseDown={() => setIsResizing(true)}
                    onDoubleClick={() => setEditorRatio(0.7)}
                />
                <div
                    className="outputContainer"
                    style={outputFlexStyle}
                    ref={outDivRef}
                >
                    <div className="output-actions">
                        <DeleteOutlineIcon
                            onClick={() => { outputRef.current=''; consoleRef.current=''; setIsError(false); setIsoutput(true); forceUpdate(); }}
                            titleAccess="Clear output"
                        />
                        <CloseIcon
                            onClick={() => { setIsoutput(false); setIsError(false); outputRef.current=''; consoleRef.current=''; }}
                            titleAccess="Close output"
                        />
                    </div>
                    {consoleRef.current}
                    {outputRef.current}
                    {isError && (
                        <div className="output-error">
                            {error && (error.stack ? error.stack : String(error))}
                        </div>
                    )}
                </div>
                </>
            )}
        </div> // Closing New Flex Wrapper
    );
};
