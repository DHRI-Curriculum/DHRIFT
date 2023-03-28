import { useRef, useEffect, useState, useContext, useReducer, Fragment } from 'react';
import Script from 'next/script';
import dynamic from 'next/dynamic';
const EditorComponent = dynamic(() => import('./EditorComponent'), { ssr: false });
import CloseIcon from '@mui/icons-material/Close';
import EditorTopbar from './EditorTopbar';

// examples of use of R in the browser
// <html>
//   <head>
//     <title>WebR Test Console</title>
//   </head>
//   <body>
//     <div>
//       <pre><code id="out">Loading webR, please wait...</code></pre>
//       <input spellcheck="false" autocomplete="off" id="input" type="text">
//       <button onclick="globalThis.sendInput()" id="run">Run</button>
//     </div>

//     <script type="module">
//       /* Create a webR console using the Console helper class */
//       import { Console } from 'https://webr.r-wasm.org/latest/webr.mjs';
//       const webRConsole = new Console({
//         stdout: line => document.getElementById('out').append(line + '\n'),
//         stderr: line => document.getElementById('out').append(line + '\n'),
//         prompt: p => document.getElementById('out').append(p),
//       });
//       webRConsole.run();

//       /* Write to the webR console using the ``stdin()`` method */
//       let input = document.getElementById('input');
//       globalThis.sendInput = () => {
//         webRConsole.stdin(input.value);
//         document.getElementById('out').append(input.value + '\n');
//         input.value = "";
//       }

//       /* Send input on Enter key */
//       input.addEventListener(
//         "keydown",
//         (evt) => {if(evt.keyCode === 13) globalThis.sendInput()}
//       );
//     </script>
//   </body>
// </html>

export default function RRunner(props) {
    const [isRReady, setIsRReady] = useState(false);
    const [isRLoading, setIsRLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState(null);
    const [isOutput, setIsoutput] = useState(false);
    const [output, setOutput] = useState('');
    const [runningCode, setRunningCode] = useState(false);

    const outputRef = useRef('');

    const code = props.code ? props.code : '';


    useEffect(() => {

        if (isRReady) {

            const webRConsole = new Console({
                stdout: line => outputRef.current += line + '\n',
                stderr: line => outputRef.current += line + '\n',
                prompt: p => outputRef.current += p,
            });
            webRConsole.run();
            setOutput(outputRef.current);
            setIsoutput(true);
            setRunningCode(false);
        }
    }, [isRReady]);


    return (
        <Fragment>
      {<><Script src="https://webr.r-wasm.org/latest/webr.mjs" 
          onLoad={() => {
            if (!isRReady && !isRLoading) {
              async function load() {
                globalThis.webR = new WebR();
              }
              load().then(() => {
                setIsRReady(true);
                setIsRLoading(false);
              })
            }
          }}
        /></>}

          <div className="editorContainer">
            <EditorTopbar spinnerNeeded={(isRLoading || runningCode)}
                setCode={props.setCode}
                setEditorOpen={props.setEditorOpen}
                setAskToRun={props.setAskToRun}
                setRunningCode={setRunningCode}
                runningCode={runningCode}
                setOutput={setOutput}
                setIsoutput={setIsoutput}
                setIsError={setIsError}
                setError={setError}
                code={code}
            />
            <div className="editor">
                <div className="editorCode">
                    <pre className='hljs'>
                        <code className='editorCode'
                            dangerouslySetInnerHTML={{ __html: 44 }}>
                                
                        </code>
                    </pre>
                </div>
                <div className="editorOutput">
                    {isError && <div className="editorOutputError">
                        <pre className='hljs'>
                            <code className='editorOutputError'
                                dangerouslySetInnerHTML={{ __html: error }}>
                            </code>
                        </pre>
                    </div>}
                    {isOutput && <div className="editorOutputCode">
                        <pre className='hljs'>
                            <code className='editorOutputCode'
                                dangerouslySetInnerHTML={{ __html: output }}>
                            </code>
                        </pre>
                    </div>}
                </div>
            </div>
        </div>
        </Fragment >
    )
}


