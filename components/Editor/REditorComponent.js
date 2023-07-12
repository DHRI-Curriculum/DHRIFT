import { useRef, useEffect, useState, useContext, useReducer, Fragment } from 'react';
import Script from 'next/script';
import dynamic from 'next/dynamic';
const EditorComponent = dynamic(() => import('./EditorComponent'), { ssr: false });
import CloseIcon from '@mui/icons-material/Close';
import EditorTopbar from './EditorTopbar';
import { WebR } from '@r-wasm/webr';

// Explicitly set the webR base URL to the webR npm package directory
const webR = new WebR(
    {
        baseUrl: '/node_modules/@r-wasm/webr/dist/'
    }
);
webR.init();


export default function REditorComponent({ defaultCode, minLines, codeOnChange, ...props }) {
    const startingCode = props.text;
    const [isRReady, setIsRReady] = useState(false);
    const [isRLoading, setIsRLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState(null);
    const [isOutput, setIsoutput] = useState(false);
    const [output, setOutput] = useState('');
    const [runningCode, setRunningCode] = useState(false);
    const [code, setCodeState] = useState(startingCode);
    const outputRef = useRef('');
    const [result, setResult] = useState(['Loading webR...']);


    const onChange = (newValue) => {
        setCodeState(newValue);
    };


    useEffect(() => {
        setIsRLoading(false);
        setIsRReady(true);
    }, []);


    async function runR() {
        const shelter = await new webR.Shelter();
        const result = await shelter.captureR(code, {
            withAutoprint: true,
            captureStreams: true,
            captureConditions: false
        });
        try {
            const out = result.output.filter(
                evt => evt.type == 'stdout' || evt.type == 'stderr'
            ).map((evt) => evt.data);
            //   document.getElementById('out').innerText = out.join('\n');
            setOutput(out.join('\n'));
        } finally {
            shelter.purge();
        }
    }


    const height = props.height ? props.height : '100%';

    return (
        <Fragment>
            <div className="editorContainer">
                <EditorTopbar spinnerNeeded={(isRLoading && !isRReady) ? true : false}
                    setCode={props.setCode}
                    run={runR}
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
            <div id="output"
                style={{
                    font: "1.3rem Inconsolata, monospace",
                    margin: "10px",
                    padding: "10px",
                    border: "1px solid #32c259",
                    borderRadius: "5px",
                    backgroundColor: "#f5f5f5",
                    color: "#32c259",
                    fontSize: "20px",
                    overflow: "auto",
                    whiteSpace: "pre-wrap"
                }}>
                <CloseIcon
                    // onClick={closeOutput}
                    style={{
                        float: "right",
                        fontSize: "20px",
                        color: "#32c259",
                        marginRight: "10px",
                        cursor: "pointer"
                    }}
                />
                {output}
            </div>
            <div id="result"
                style={{
                    font: "1.3rem Inconsolata, monospace",
                    margin: "10px",
                    padding: "10px",
                    border: "1px solid #32c259",
                    borderRadius: "5px",
                    backgroundColor: "#f5f5f5",
                    color: "#32c259",
                    fontSize: "20px",
                    overflow: "auto",
                    whiteSpace: "pre-wrap"
                }}>
                <CloseIcon
                    // onClick={closeResult}
                    style={{
                        float: "right",
                        fontSize: "20px",
                        color: "#32c259",
                        marginRight: "10px",
                        cursor: "pointer"
                    }}
                />
                {result}
            </div>

            <div id="fig" style={{
                width: "100%",
                height: "100%",
                display: "none"
            }}></div>
        </Fragment >
    )
}


