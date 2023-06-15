import { useRef, useEffect, useState, useContext, useReducer, Fragment } from 'react';
import Script from 'next/script';
import dynamic from 'next/dynamic';
const EditorComponent = dynamic(() => import('./EditorComponent'), { ssr: false });
import EditorTopbar from './EditorTopbar';
import { WebR } from '@r-wasm/webr';

// Explicitly set the webR base URL to the webR npm package directory
const webR = new WebR(
//     {
//     baseUrl: '../node_modules/@r-wasm/webr/dist/',
// }
);


export default function RRunner(props) {
    const [isRReady, setIsRReady] = useState(false);
    const [isRLoading, setIsRLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState(null);
    const [isOutput, setIsoutput] = useState(false);
    const [output, setOutput] = useState('');
    const [runningCode, setRunningCode] = useState(false);

    const outputRef = useRef('');
    const [result, setResult] = useState(['Loading webR...']);
    const code = props.code ? props.code : '';

    async function runRCode() {
        await webR.init();
        const rnorm = await webR.evalR('rnorm(5,1,1)');
        try {
            console.log('rnorm', rnorm);
            const result = await rnorm.toArray();
            setResult(result);
            console.log(result);
        }
        catch (e) {
            setError(e);
        }
        finally {
            webR.destroy(rnorm);
        }
    }

    // when the page is loaded, initialize webR and run the code.
    useEffect(() => {
            runRCode();
    }, []);



    return (
        <Fragment>
            {/* {<><Script src="https://webr.r-wasm.org/latest/webr.mjs"
                type='module'
                onLoad={() => {
                    console.log('R is loading');
                    if (!isRReady) {
                        async function load() {
                            // webR = dynamic(import('https://webr.r-wasm.org/latest/webr.mjs'));
                               // Dynamically load webR
          const webRLoad = (await import('https://webr.r-wasm.org/latest/webr.mjs')).default;
          const webR = new webR;

                        }
                        load().then(() => {
                            console.log('R is ready');
                            setIsRReady(true);
                            setIsRLoading(false);
                        })
                    }
                }}
                onError={(e) => {
                    console.error('Script failed to load', e)
                  }}
            /></>} */}


            <div className="editorContainer">
                <EditorTopbar spinnerNeeded={(isRLoading && !isRReady) ? true : false}
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
                            >
                                {result}

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


