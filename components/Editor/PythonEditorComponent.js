// import Editor from "@monaco-editor/react";
import { useRef, useEffect, useState, useContext, useReducer, Fragment } from "react";
import Script from "next/script";
import dynamic from "next/dynamic";
const EditorComponent = dynamic(
  () => import("./EditorComponent"),
  { ssr: false }
);
import { Alert } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { PyodideContext } from '../Wasm/PyodideProvider';
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
  const [matplotlibDiv, setMatplotlibDiv] = useState(null);

  const {
    hasLoadPyodideBeenCalled,
    isPyodideLoading,
    setIsPyodideLoading,
    isPyodideReady,
    setIsPyodideReady,
  } = useContext(PyodideContext)

  useEffect(() => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations()
            .then(function (registrations) {
                for (let registration of registrations) {
                    console.log(registration);
                    // if (registration.active.scriptURL == 'coi-serviceworker.js') {
                    registration.unregister();
                    window.location.reload()
                }
            });
    }
}, [])

  useEffect(() => {
    if (isPyodideReady) {
      setIsPyodideLoading(false)
      setPyodideLoaded(true);
    }
  }, [hasLoadPyodideBeenCalled, setIsPyodideLoading, isPyodideReady])


  useEffect(() => {
    setCodeState(startingCode);
    if (pyodideLoaded && props.askToRun === true) {
      runPyodide(startingCode);
    }
    props.setAskToRun(false);
  }, [props.askToRun])

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


    if (filteredSnippets?.length > 0) {
      filteredSnippets.forEach((snippet, index) => {
        namespace.set(`file${index + 1}`, snippet.content);
      });
    }
    namespace.set("print", (s) => {
      printList.push(s.toString());
    });

    namespace.set("log", (s) => {
      console.log(s);
    });
    await pyodide.runPythonAsync(checkImports(code),
      { globals: namespace });
    await pyodide.runPythonAsync(
`
import sys
from js import prompt
import builtins
def input(p=""):
  return prompt(p)
builtins.input = input
# dangerous?
sys.tracebacklimit = 0
`, { globals: namespace });
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
      runPyodide(code);
    }
  }

  function closeError() {
    setIsError(false);
  }

  function closePlot() {
    setIsPlot(false);
    // const fig = document.getElementById('fig');
    // fig.remove();
    // const newFig = document.createElement('div');
    // newFig.id = 'fig';
    // document.getElementById('figHolder').appendChild(newFig);
  }

  useEffect(() => {
    // listen for the creation of a div with id that starts with 'matplotlib'
    // when that happens, move the contents of that div to id='fig'
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.target.id.startsWith('matplotlib')) {
          setIsPlot(true);

          const fig = document.getElementById('fig');
          // const matplotlibDiv = document.getElementById(mutation.target.id);
          setMatplotlibDiv(mutation.target);
        }
      });
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }, []);

  useEffect(() => {
    if (matplotlibDiv && isPlot) {
      const fig = document.getElementById('fig');
      fig.appendChild(matplotlibDiv);
    }
  }, [matplotlibDiv, isPlot])

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
      <div className="editorContainer"
      style={{
        overflowY: 'auto',
      }}
      >
      {isError && <Alert id="error"
          severity="error"
          style={{
            font: "1.3rem Inconsolata, monospace",
            whiteSpace: "pre-wrap",
            zIndex: "1000",
          }}
        >
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
        </Alert>}
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
        <div
          id='figHolder'
          style={{
            backgroundColor: 'white',
          }}
        >
          {isPlot &&
            <>
              <CloseIcon
                onClick={closePlot}
                style={{
                  float: "right",
                  fontSize: "20px",
                  color: "#32c259",
                  marginRight: "10px",
                  cursor: "pointer"
                }} />
              <div id='fig'>
              </div>
            </>}
        </div>
      </div>

      <div className="shellContainer">
        {!isPlot && <PythonSideREPLComponent
          print={print}
          setPrint={setPrint}
          {...props}
        />}

      </div>
    </div>
  )
}