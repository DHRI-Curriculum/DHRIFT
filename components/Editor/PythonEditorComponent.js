// import Editor from "@monaco-editor/react";
import { useRef, useEffect, useState, useContext, useReducer, Fragment } from "react";
import Script from "next/script";
import dynamic from "next/dynamic";
const EditorComponent = dynamic(
  () => import("./EditorComponent"),
  { ssr: false }
);
import CloseIcon from '@mui/icons-material/Close';
import { PyodideContext } from '../PyodideProvider';
import EditorTopbar from "./EditorTopbar";
import PythonSideREPLComponent from './PythonSideRepl';

export default function PythonEditorComponent({ defaultCode, minLines, codeOnChange, ...props }) {

  const startingCode = props.text;
  const [code, setCodeState] = useState(startingCode);
  const [pyodideLoaded, setPyodideLoaded] = useState(false);
  const [pyodideObject, setPyodideObject] = useState(null);
  const [isoutput, setIsoutput] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const outputRef = useRef(null);
  const [print, setPrint] = useState(null);
  const [runningCode, setRunningCode] = useState(false);
  const [isPlot, setIsPlot] = useState(false);

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


  useEffect(() => {
    setCodeState(startingCode);
    if (pyodideLoaded && props.askToRun === true) {
      runPyodide(startingCode);
    }
    props.setAskToRun(false);
  }, [props.askToRun])



  /*useEffect(() => {
    nltoolkit = await fetch('https://raw.githubusercontent.com/nltk/nltk_data/gh-pages/packages/tokenizers/punkt.zip')
      .then(nltoolkit =>
        if nltoolkit.)

  }, [])
  */

  const onChange = (newValue) => {
    setCodeState(newValue);
  };

  const allSnippets = props.allUploads;
  // chosenSnippets is a string of files separated by commas, make it an array
  const chosenSnippets = typeof props.snippets === 'string' ? props.snippets.split(',') : [];

  var filteredSnippets = allSnippets;

  const checkImports = (code) => {
    const lines = code.split('\n');
    let matLine = '';
    lines.forEach(line => {
      if (line.includes('import matplotlib')) {
        matLine =
          `
import matplotlib
matplotlib.use("module://matplotlib_pyodide.html5_canvas_backend")\n`
      }
    })
    return matLine;
  }

  let printList = [];
  const runPyodide = async (code) => {
    setRunningCode(true);
    setIsoutput(false);
    setIsError(false);
    setError(null);
    outputRef.current = "";

    await pyodide.loadPackagesFromImports(code);

    let namespace = pyodide.globals.get("dict")();

    

    filteredSnippets.forEach((snippet, index) => {
      namespace.set(`file${index + 1}`, snippet.content);
    });
    namespace.set("print", (s) => {
      printList.push(s.toString());
    });
    namespace.set("input", (s) => {
      var response = prompt(s);
      return response;
    });
    namespace.set("log", (s) => {
      console.log(s);
    });
    await pyodide.runPythonAsync(checkImports(code),
      { globals: namespace });
    return await pyodide.runPythonAsync(code,
      { globals: namespace }
    ).then(result => {
      setIsoutput(true);
      outputRef.current = outputRef.current + '\n' + result;
      setPrint(printList.join('\n'));
    }).catch((err) => {
      setIsError(true);
      setError(err);
    }).finally(() => {
      setRunningCode(false);
    });
  };

  function showValue() {
    if (pyodideLoaded) {
      closePlot();
      runPyodide(code);
    }
  }

  function closeError() {
    setIsError(false);
  }

  function closePlot() {
    setIsPlot(false);
    const fig = document.getElementById('fig');
    fig.remove();
    const newFig = document.createElement('div');
    newFig.id = 'fig';
    document.getElementById('figHolder').appendChild(newFig);
  }

  useEffect(() => {
    // listen for the creation of a div with id that starts with 'matplotlib'
    // when that happens, move the contents of that div to id='fig'
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.target.id.startsWith('matplotlib')) {
          const fig = document.getElementById('fig');
          const matplotlibDiv = document.getElementById(mutation.target.id);
          fig.appendChild(matplotlibDiv);
          setIsPlot(true);
        }
      });
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }, []);

  const height = props.height ? props.height : '100%';

  return (
    <div>
      {<><Script src="https://cdn.jsdelivr.net/pyodide/v0.22.0/full/pyodide.js" />
        <Script src="https://cdn.jsdelivr.net/pyodide/v0.22.0/full/pyodide.asm.js"
          onLoad={() => {
            let getPython = async () => {
              if (!isPyodideReady) {
                async function load() {
                  globalThis.pyodide = await loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.22.0/full/' })
                }
                load().then(() => {
                  setIsPyodideReady(true)
                  setPyodideLoaded(true);
                })
              }
            }
            try {
              getPython();
            } catch (err) {
              console.log(err);
              // wait 2 seconds and try again
              setTimeout(() => {
                getPython();
              }, 2000);

            }

          }}
        /></>}
      <div className="editorContainer">
        <EditorTopbar spinnerNeeded={((isPyodideLoading || !isPyodideReady) || runningCode)}
          snippets={filteredSnippets} run={showValue}
          defaultCode={startingCode} setCode={setCodeState}
          language={props.language}
          {...props}
        />
        <EditorComponent code={code}
          onChange={onChange}
          maxLines='Infinity'
          minLines={minLines}
          language={props.language}
          height={height} />
      </div>

      <div className="shellContainer">
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
        {!isPlot && <PythonSideREPLComponent
          print={print}
          setPrint={setPrint}
          {...props}
        />}
        <div id='figHolder'>
          {/* {isPlot && <CloseIcon
            onClick={closePlot}
            style={{
              float: "right",
              fontSize: "20px",
              color: "#32c259",
              marginRight: "10px",
              cursor: "pointer"
            }} />} */}
          <div id='fig'>
          </div>
        </div>
      </div>
    </div>
  )
}