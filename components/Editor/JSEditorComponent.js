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


    var JSoutput = function (a) {
        var str = "["
        if (typeof (a) == "object" && a.length) {
            for (var i = 0; i < a.length; i++)
                if (typeof (a[i]) == "object" && a[i].length) {
                    str += (i == 0 ? "" : " ") + "["
                    for (var j = 0; j < a[i].length; j++)
                        str += a[i][j] + (j == a[i].length - 1 ?
                            "]" + (i == a.length - 1 ? "]" : ",") + "\n" : ", ");
                } else str += a[i] + (i == a.length - 1 ? "]" : ", ");
        } else str = a;
        return str;
    }

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
            var logged = [];
            // store logged values in logged array
            var log = function (value) {
                logged.push(value);
            };
            // capture console.log output 
            console.oldLog = console.log;
            console.log = log;

            var result = eval(JScode);

            for (var i = 0; i < logged.length; i++) {
                consoleRef.current += JSoutput(logged[i]) + "\n";
            }

            writeln(result);
            forceUpdate();
            setIsoutput(true);
        } catch (e) {
            setError(e);
            setIsError(true);
        }
        if (str != undefined) { outputRef.current += str; }
        // restore console.log
        console.log = console.oldLog;
        setRunningCode(false);
    }

    const onChange = (newValue) => {
        setJSCode(newValue);
    };
    const height = props.height ? props.height : '100%';

    return (
        <>
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
        </>
    );
};
