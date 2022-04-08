// import Editor from "@monaco-editor/react";
import { useRef, useEffect, useState, useContext, useReducer } from "react";
import Script from "next/script";
import dynamic from "next/dynamic";
const EditorComponent = dynamic(
  () => import("./EditorComponent"),
  { ssr: false }
);
import Button from '@mui/material/Button';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import CloseIcon from '@mui/icons-material/Close';
import { PyodideContext } from './PyodideProvider';
import CircularProgress from '@mui/material/CircularProgress';
import FileList from "./FileList";

export default function CodeEditorComponent({ defaultCode = "# Write your code here", minLines, ...props }) {
  const [code, setCode] = useState(defaultCode);
  const [pyodideReady, setPyodideReady] = useState(false);
  const [pyodideLoaded, setPyodideLoaded] = useState(false);
  const [pyodideObject, setPyodideObject] = useState(null);
  const [isoutput, setIsoutput] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const outputRef = useRef(null);
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
    setCode(newValue);
  };

  const allSnippets = props.allSnippets;
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

  const runPyodide = async (code) => {
    setIsoutput(false);
    setIsError(false);
    setError(null);
    outputRef.current = "";

    // gets rid of user-defined variables
    pyodide.globals.clear();
    await pyodide.loadPackage("matplotlib");
    pyodide.runPython(
      `
import matplotlib
matplotlib.use("module://matplotlib.backends.html5_canvas_backend")
`
    );
    pyodide.globals.set('print', (s) => {
      outputRef.current = outputRef.current + String(s) + "\n";
    });
    pyodide.globals.set('input', (s) => {
      prompt(s);
    });
    await pyodide.loadPackage("nltk");
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
      {<><Script src="https://cdn.jsdelivr.net/pyodide/v0.19.1/full/pyodide.js" />
        <Script src="https://cdn.jsdelivr.net/pyodide/v0.19.1/full/pyodide.asm.js"
          onLoad={() => {
            if (!isPyodideReady) {
              async function load() {
                globalThis.pyodide = await loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.19.0/full/' })
              }
              load().then(() => {
                setIsPyodideReady(true)
                setPyodideLoaded(true);
              })
            }
          }}
        /></>}
      <div className="editorContainer">
        <FileList snippets={filteredSnippets} />
        <div className="buttonsContainer">
          {!isPyodideLoading && <Button
            onClick={() => {
              showValue();
            }}
            variant="outlined"
            style={{
              margin: "10px",
              width: "100px",
              height: "25px",
              backgroundColor: "#32c259",
              color: "white",
              fontSize: "20px",
              borderRadius: "5px",
              border: "none",
              boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
              outline: "none",
              padding: "15px"
            }}>
            <PlayArrowIcon style={{
              marginRight: "10px",
              fontSize: "20px"
            }} />
            Run</Button>}
          {isPyodideLoading && <CircularProgress
            style={{
              marginLeft: "10px",
              marginTop: "10px"
            }}
          />}
          <Button
            variant="text"
            onClick={() => {
              setCode(defaultCode);
            }}
            style={{
              color: "#32c259",
              fontSize: "16px",
              borderRadius: "5px",
              border: "none",
              boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
              outline: "none",
              padding: "15px",
              float: "right"
            }}>
            Revert Code
          </Button>
        </div>
        <EditorComponent code={code} onChange={onChange} maxLines='Infinity' minLines={minLines} />
      </div>

      {isoutput && <div id='output'
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
