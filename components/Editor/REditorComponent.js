import { useRef, useEffect, useState, useContext, useReducer, Fragment } from 'react';
import Script from 'next/script';
import dynamic from 'next/dynamic';
const EditorComponent = dynamic(() => import('./EditorComponent'), { ssr: false });
import CloseIcon from '@mui/icons-material/Close';
import EditorTopbar from './EditorTopbar';
import { WebR } from '@r-wasm/webr';
import RSideRepl from './RSideRepl';

// Explicitly set the webR base URL to the webR npm package directory
const webR = new WebR(
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
        const cleanedCode = code.replace(/(\r\n|\n|\r)/gm, " \n");

        const shelter = await new webR.Shelter();

        const result = await shelter.captureR(cleanedCode, {
            withAutoprint: true,
            captureStreams: true,
            captureConditions: false
        });
        try {
            const out = result.output.filter(
                evt => evt.type == 'stdout' || evt.type == 'stderr'
            ).map((evt) => evt.data);
              document.getElementById('out').innerText = out.join('\n');
        } finally {
            shelter.purge();
        }
    }


    const height = props.height ? props.height : '100%';

    return (
        <Fragment>
            <Script src='../coi-service.js' />
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
                    {...props}
                />
                <EditorComponent code={code}
                    language='r'
                    onChange={onChange}
                    maxLines='Infinity'
                    minLines={minLines}
                    height={height} />
            </div>

            <div className="outputContainer" id='out'
            style={{
                padding: "10px",
                backgroundColor: "#f5f5f5",
                color: "#32c259",
                fontSize: "20px",
                height: "100%",
                font: "1.3rem Inconsolata, monospace",
                whiteSpace: "pre-wrap",
                borderRadius: "5px",

            }}
            >
                {/* {output} */}
            </div>


        </Fragment >
    )
}

