import { useRef, useState, useReducer } from "react";

import dynamic from "next/dynamic";
const EditorComponent = dynamic(
    () => import("./EditorComponent"),
    { ssr: false }
);
const Frame = dynamic(
    () => import('react-frame-component'),
    { ssr: false }
);
import "allotment/dist/style.css";
import EditorTopbar from "./EditorTopbar";
import CloseIcon from '@mui/icons-material/Close';


export default function JSEditorComponent({ defaultCode = '// Write Javascript Here', ...props }) {
    const [code, setCode] = useState(defaultCode);
    const [runningCode, setRunningCode] = useState(false);
    const outputRef = useRef(null);
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

    const outputComponent = () => {
        return (
            <div id='output'
                // ref={outputRef}
                style={{
                    margin: "10px",
                    padding: "10px",
                    border: "1px solid #32c259",
                    borderRadius: "5px",
                    backgroundColor: "#f5f5f5",
                    color: "#32c259",
                    fontSize: "20px",
                    overflow: "auto",
                    font: "1.3rem Inconsolata, monospace",
                    whiteSpace: "pre-wrap",
                }}>
                <CloseIcon
                    onClick={closeOutput}
                    style={{
                        float: "right",
                        fontSize: "20px",
                        color: "#32c259",
                        marginRight: "10px",
                        cursor: "pointer"
                    }}
                />
                {outputRef.current}
            </div>
        )
    }

    const errorComponent = () => {
        return (
            <div id="error"
                style={{
                    font: "1.3rem Inconsolata, monospace",
                    margin: "10px",
                    padding: "10px",
                    border: "1px solid red",
                    borderRadius: "5px",
                    backgroundColor: "#f5f5f5",
                    color: "red",
                    fontSize: "20px",
                    overflow: "auto",
                    whiteSpace: "pre-wrap"
                }}>
                <CloseIcon
                    onClick={closeError}
                    style={{
                        float: "right",
                        fontSize: "20px",
                        color: "#32c259",
                        marginRight: "10px",
                        cursor: "pointer"
                    }}
                />
                {String(error)}
            </div>
        )
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
        setIsoutput(false);
        setRunningCode(true);
        outputRef.current = "";
        try {
            var logged = [];
            // store logged values in logged array
            var log = function (value) {
                logged.push(value);

            };
            // capture console.log output 
            console.oldLog = console.log;
            console.log = log;
           
            var result = eval(code);

            writeln('Console.log:');
            for (var i = 0; i < logged.length; i++) {
                writeln(logged[i]);
            }
            writeln('Returned:');
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

    const onChangeJavascript = (newValue) => {
        setCode(newValue);
    };

    return (
        <>
            <div className="editorContainer" style={{ width: '100%' }}>
                <EditorTopbar spinnerNeeded={runningCode}
                    snippets={filteredSnippets} 
                    run={JSrun} language='JavaScript'
                    defaultCode={defaultCode}
                    setCode={setCode}
                    />
                <EditorComponent code={code}
                    onChange={onChangeJavascript} language={'javascript'}
                    {...props}
                    />
            </div>
            {isoutput && outputComponent()}
            {isError && errorComponent()}
        </>
    );
};
