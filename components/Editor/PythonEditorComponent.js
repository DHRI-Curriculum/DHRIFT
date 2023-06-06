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
import PythonSideREPLComponent from '../PythonSideRepl';

export default function CodeEditorComponent({ defaultCode, minLines, codeOnChange, ...props }) {

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
    // if (codeOnChange) {
    //   codeOnChange(newValue);
    // } else {
    // props.setText(newValue);
    setCodeState(newValue);
    // }
  };


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

  const printPlot =
    `
import js
import numpy as np
import scipy.stats as stats
import matplotlib.pyplot as plt
import io, base64
# get values from inputs
mu = int(1)
sigma = int(2)
# generate an interval
x = np.linspace(mu - 3*sigma, mu + 3*sigma, 100)
# calculate PDF for each value in the x given mu and sigma and plot a line
plt.plot(x, stats.norm.pdf(x, mu, sigma))
# create buffer for an image
buf = io.BytesIO()
# copy the plot into the buffer
plt.savefig(buf, format='png')
buf.seek(0)
# encode the image as Base64 string
img_str = 'data:image/png;base64,' + base64.b64encode(buf.read()).decode('UTF-8')
# show the image
img_tag = js.document.getElementById('fig')
img_tag.src = img_str
buf.close()
    `

  let printList = [];
  const runPyodide = async (code) => {
    setRunningCode(true);
    setIsoutput(false);
    setIsError(false);
    setError(null);
    outputRef.current = "";

    // gets rid of user-defined variables
    // pyodide.globals.clear();


    await pyodide.loadPackagesFromImports(code);
    await pyodide.loadPackagesFromImports(printPlot);
    // pyodide.globals.generate_plot_img = printPlot;  

    filteredSnippets.forEach((snippet, index) => {
      pyodide.runPython(
        `
file${index + 1} = ${JSON.stringify(snippet.content)}
            `);
    });

    let namespace = pyodide.globals.get("dict")();
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
    namespace.set("generate_plot_img", () => {
      pyodide.runPython(printPlot);
    });


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

  function closeOutput() {
    setIsoutput(false);
  }

  function closeError() {
    setIsError(false);
  }

  const height = props.height ? props.height : '100%';

  return (
    <Fragment>
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
        <EditorTopbar spinnerNeeded={((isPyodideLoading || !isPyodideReady ) || runningCode)}
          snippets={filteredSnippets} run={showValue}
          defaultCode={startingCode} setCode={setCodeState}
          language='Python'
          {...props}
        />
        <EditorComponent code={code}
          onChange={onChange}
          maxLines='Infinity'
          minLines={minLines}
          height={height} />
      </div>

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
      <PythonSideREPLComponent
        print={print}
        setPrint={setPrint}
        {...props}
      />
      <div id="fig" style={{ 
        width: "100%", 
        height: "100%",
        display: "none"
        }}></div>

    </Fragment>
  )
}
