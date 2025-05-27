import { useRef, useState, useReducer, useEffect } from "react";
import dynamic from "next/dynamic";
const EditorComponent = dynamic(
    () => import("./EditorComponent"),
    { ssr: false }
);
import EditorTopbar from "./EditorTopbar";
import JSSideTerminal from "./JSSideTerminal";
import CloseIcon from '@mui/icons-material/Close';


export default function JSEditorComponent({ defaultCode = '// Write JavaScript Here', ...props }) {
    const [JScode, setJSCode] = useState(defaultCode);
    const [runningCode, setRunningCode] = useState(false);
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
            console.log = console.oldLog; // Restore console.log immediately after eval

            // Process loggedLines
            for (var i = 0; i < loggedLines.length; i++) {
                // Join arguments of a single log call with spaces, processed by JSoutput
                const lineOutput = loggedLines[i].map(arg => JSoutput(arg)).join(' ');
                consoleRef.current += lineOutput + "\n";
            }

            writeln(result);
            forceUpdate();
            setIsoutput(true);
        } catch (e) {
            setError(e);
            setIsError(true);
        }
        if (str != undefined) { outputRef.current += str; }
        // console.log has already been restored
        setRunningCode(false);
    }

    const onChange = (newValue) => {
        setJSCode(newValue);
    };
    const height = props.height ? props.height : '100%';

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}> {/* New Flex Wrapper */}
            <div className="editorContainer" style={{ width: '100%' }}>
                <EditorTopbar spinnerNeeded={runningCode}
                    snippets={filteredSnippets}
                    run={JSrun} language='JavaScript'
                    defaultCode={defaultCode}
                    setCode={setJSCode}
                    {...props}
                />
                <EditorComponent code={JScode}
                    onChange={onChange} language={'javascript'}
                    height={height}
                    {...props}
                />
            </div>
            <JSSideTerminal
                outputRef={outputRef}
                consoleRef={consoleRef}
                error={error}
            />
        </div> // Closing New Flex Wrapper
    );
};
