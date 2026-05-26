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
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { PyodideContext } from '../Wasm/PyodideProvider';
import EditorTopbar from "./EditorTopbar";

export default function PythonEditorComponent({ defaultCode, minLines, codeOnChange, scrollContainerRef, ...props }) {

  const startingCode = props.text;
  const [code, setCodeState] = useState(startingCode);
  const [pyodideLoaded, setPyodideLoaded] = useState(false);
  const [pyodideObject, setPyodideObject] = useState(null);
  const [isoutput, setIsoutput] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const outputRef = useRef(null);
  const [runningCode, setRunningCode] = useState(false);
  const [outputVersion, setOutputVersion] = useState(0);
  const [isPlot, setIsPlot] = useState(false);
  const [matplotlibDiv, setMatplotlibDiv] = useState(null);

  const {
    hasLoadPyodideBeenCalled,
    isPyodideLoading,
    setIsPyodideLoading,
    isPyodideReady,
    setIsPyodideReady,
  } = useContext(PyodideContext)

  // Removed aggressive service worker unregister/reload to prevent flicker and reload loops

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

  const runPyodide = async (code) => {
    setRunningCode(true);
    setIsoutput(false);
    setIsError(false);
    setError(null);
    outputRef.current = "";

    if (code === null) {
      setRunningCode(false);
      return;
    }

    await pyodide.loadPackagesFromImports(code);

    let namespace = pyodide.globals.get("dict")();

    if (filteredSnippets?.length > 0) {
      filteredSnippets.forEach((snippet, index) => {
        namespace.set(`file${index + 1}`, snippet.content);
      });
    }
    // Do not override Python's print; capture sys.stdout instead

    await pyodide.runPythonAsync(checkImports(code),
      { globals: namespace });
    await pyodide.runPythonAsync(
      `
import sys
from js import prompt
import builtins
import io
_pyodide_out = io.StringIO()
_sys_stdout_orig = sys.stdout
sys.stdout = _pyodide_out
def input(p=""):
  return prompt(p)
builtins.input = input
# dangerous?
sys.tracebacklimit = 0
`, { globals: namespace });
    try {
      const result = await pyodide.runPythonAsync(code, { globals: namespace });
      // Collect stdout
      try {
        const outProxy = namespace.get('_pyodide_out');
        const outStr = outProxy && outProxy.getvalue ? outProxy.getvalue().toString() : '';
        const resultStr = (result !== undefined && result !== null) ? result.toString() : '';
        const combined = resultStr ? (outStr ? outStr + '\n' + resultStr : resultStr) : outStr;
        outputRef.current = combined;
        setIsoutput(true);
        setOutputVersion((v) => v + 1);
      } catch (e) {
        // Fallback if buffer missing
        setIsoutput(true);
        setOutputVersion((v) => v + 1);
      }
    } catch (err) {
      setIsError(true);
      setError(err);
    } finally {
      // Restore stdout
      try { await pyodide.runPythonAsync('sys.stdout = _sys_stdout_orig', { globals: namespace }); } catch (_) {}
      setRunningCode(false);
    }
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

  const [isResizing, setIsResizing] = useState(false);
  const [editorRatio, setEditorRatio] = useState(0.7); // portion of space for editor when output visible
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

  const showOutput = !!isoutput;
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
    // Wait for layout to settle
    requestAnimationFrame(() => setTimeout(scrollToChild, 0));
  }, [showOutput, outputVersion, runningCode]);
  const editorFlexStyle = showOutput
    ? { flex: `0 0 ${Math.round(editorRatio * 100)}%`, minHeight: 0 }
    : { flex: '1 1 auto', minHeight: 0 };
  const outputFlexStyle = showOutput ? { flex: `0 0 ${Math.round((1 - editorRatio) * 100)}%`, minHeight: 0 } : {};

  return (
    <div ref={containerRef} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
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
              // Retry after 2 seconds on failure
              setTimeout(() => {
                getPython();
              }, 2000);
            }

          }}
        /></>}
      <div className="editorContainer" style={{ ...editorFlexStyle, display: 'flex', flexDirection: 'column' }}>
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
        <EditorTopbar
          spinnerNeeded={((isPyodideLoading || !isPyodideReady) || runningCode)}
          snippets={filteredSnippets}
          run={showValue}
          defaultCode={startingCode}
          setCode={setCodeState}
          language={props.language}
          {...props}
        />
        <div style={{ flex: 1, minHeight: 0, width: '100%', display: 'flex' }}>
          <EditorComponent
            code={code}
            onChange={onChange}
            minLines={minLines}
            language={props.language}
            height={'100%'}
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
            style={{
              ...outputFlexStyle,
            }}
            ref={outDivRef}
          >
            <div className="output-actions">
              <DeleteOutlineIcon
                onClick={() => { outputRef.current=''; setIsoutput(true); setOutputVersion((v)=>v+1); }}
                titleAccess="Clear output"
              />
              <CloseIcon
                onClick={() => { setIsoutput(false); outputRef.current=''; }}
                titleAccess="Close output"
              />
            </div>
            {outputRef.current}
          </div>
        </>
      )}
        <div
          id='figHolder'
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

      <div className="shellContainer"></div>
    </div>
  )
}
