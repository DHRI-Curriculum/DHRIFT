// import Editor from "@monaco-editor/react";
import { useRef, useEffect, useState, useContext, useReducer } from "react";
import Script from "next/script";
import dynamic from "next/dynamic";
const EditorComponent = dynamic(
  () => import("./EditorComponent"),
  { ssr: false }
);
// import Button from '@mui/material/Button';
// import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import CloseIcon from '@mui/icons-material/Close';
import { PyodideContext } from '../PyodideProvider';
// import CircularProgress from '@mui/material/CircularProgress';
// import FileList from "./FileList";
import EditorTopbar from "./EditorTopbar";

export default function PythonEditorComponent({ defaultCode = "# Write your code here", minLines, codeOnChange, ...props }) {
  const [code, setCode] = useState(defaultCode);
  const [pyodideReady, setPyodideReady] = useState(false);
  const [pyodideLoaded, setPyodideLoaded] = useState(false);
  const [pyodideObject, setPyodideObject] = useState(null);
  const [isoutput, setIsoutput] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const outputRef = useRef(null);
  const [runningCode, setRunningCode] = useState(false);
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

  const {
    hasLoadPyodideBeenCalled,
    isPyodideLoading,
    setIsPyodideLoading,
    isPyodideReady,
    setIsPyodideReady,
  } = useContext(PyodideContext)

  useEffect(() => {
    if (isPyodideReady) {
      setIsPyodideLoading(false)
    }
  }, [hasLoadPyodideBeenCalled, setIsPyodideLoading, isPyodideReady])

  /*useEffect(() => {
    nltoolkit = await fetch('https://raw.githubusercontent.com/nltk/nltk_data/gh-pages/packages/tokenizers/punkt.zip')
      .then(nltoolkit =>
        if nltoolkit.)

  }, [])
  */

  const onChange = (newValue) => {
    if (codeOnChange) {
      codeOnChange(newValue);
    } else {
      setCode(newValue);
    }
  };

  const allSnippets = props.allUploads;
  // chosenSnippets is a string of files separated by commas, make it an array
  const chosenSnippets = typeof props.uploads === 'string' ? props.uploads.split(',') : [];
  var filteredSnippets = [];

  if (chosenSnippets != undefined) {
    chosenSnippets.forEach(snippet => {
      const currentFile = allSnippets.find(file => file.slug === snippet.trim());
      if (currentFile != undefined) {
        filteredSnippets.push(currentFile);
      }
    })
  }

  const runPyodide = async (code) => {
    setRunningCode(true);
    setIsoutput(false);
    setIsError(false);
    setError(null);
    outputRef.current = "";

    // gets rid of user-defined variables
    pyodide.globals.clear();
//     await pyodide.loadPackage("matplotlib");
//     pyodide.runPython(
//       `
// import matplotlib
// matplotlib.use("module://matplotlib.backends.html5_canvas_backend")
// `
//     );
// await pyodide.loadPackage("nltk");
    pyodide.globals.set('print', (s) => {
      outputRef.current = outputRef.current + String(s) + "\n";
    });
    pyodide.globals.set('input', (s) => {
      prompt(s);
    });
    await pyodide.loadPackagesFromImports(code);

    filteredSnippets.forEach((snippet, index) => {
      pyodide.runPython(
        `
file${index + 1} = ${JSON.stringify(snippet.content)}
            `);
    });
    return await pyodide.runPythonAsync(code).then(result => {
      setIsoutput(true);
      outputRef.current = outputRef.current + '\n' + result;
      forceUpdate();
    }).catch((err) => {
      setIsError(true);
      setError(err);
    }).finally(() => {
      setRunningCode(false);
    });
  };

  function showValue() {
    runPyodide(code);
  }

  function closeOutput() {
    setIsoutput(false);
  }

  function closeError() {
    setIsError(false);
  }

  return (
    <div>
      {<><Script src="https://cdn.jsdelivr.net/pyodide/v0.20.0/full/pyodide.js" />
        <Script src="https://cdn.jsdelivr.net/pyodide/v0.20.0/full/pyodide.asm.js"
          onLoad={() => {
            if (!isPyodideReady) {
              async function load() {
                globalThis.pyodide = await loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.20.0/full/' })
              }
              load().then(() => {
                setIsPyodideReady(true)
                setPyodideLoaded(true);
              })
            }
          }}
        /></>}
      <div className="editorContainer">
        <EditorTopbar spinnerNeeded={(isPyodideLoading || runningCode)} snippets={filteredSnippets} run={showValue} language='Python' />
        <EditorComponent code={code} onChange={onChange} maxLines='Infinity' minLines={minLines} />
      </div>

      {isoutput && <div id='output'
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
      </div>}

      {isError && <div id="error"
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
      </div>}
    </div>
  )
}
