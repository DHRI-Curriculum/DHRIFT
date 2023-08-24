import { useRef, useEffect, useState, useContext, useReducer, Fragment } from 'react';
import Script from 'next/script';
import dynamic from 'next/dynamic';
const EditorComponent = dynamic(() => import('./EditorComponent'), { ssr: false });
import CloseIcon from '@mui/icons-material/Close';
import EditorTopbar from './EditorTopbar';
import { WebR } from '@r-wasm/webr';



export default function REditorComponent({ defaultCode, minLines, codeOnChange, ...props }) {

    const [isRReady, setIsRReady] = useState(false);
    const [isRLoading, setIsRLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState(null);
    const [isOutput, setIsoutput] = useState(false);
    const [output, setOutput] = useState('');
    const [runningCode, setRunningCode] = useState(false);
    const outputRef = useRef('');
    const [result, setResult] = useState(['Loading webR...']);
    // const [Rcode, setRCode] = useState(defaultCode);
    const Rcode = useRef(defaultCode);


    const onChange = (newValue) => {
        // setRCode(newValue);
        Rcode.current = newValue;
    };

    var filteredSnippets = props.allUploads;
    const webR = new WebR();
    webR.init();


    async function runR(theCode) {
        setRunningCode(true);
        const shelter = await new webR.Shelter();

        let fileCode = '';
        if (filteredSnippets?.length > 0) {
        filteredSnippets.forEach((snippet, index) => {
            // CURRENT LIMIT IS 3 FILES
            if (index < 3) {
                // escape characters troublesome to R
                let escapedSnippet = snippet.content.replace(/'/g, "\\'");
                escapedSnippet = escapedSnippet.replace(/\n/g, "\\n");
                let filename = `file` + index + `<- '` + escapedSnippet + `'\n`;
                fileCode += filename;
            }
        });
    }

        if (theCode === undefined) {
            theCode = Rcode.current;
        }

        // escape characters troublesome to R
        let cleanedCode = theCode.replace(/(\r\n|\n|\r)/gm, " \n");

        cleanedCode = fileCode + cleanedCode;

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
            setRunningCode(false);
        }
    }

    useEffect(() => {
        Rcode.current = defaultCode;
        if (props.askToRun === true) {
            runR(Rcode.current);
        }
        props.setAskToRun(false);
      }, [props.askToRun])

    const height = props.height ? props.height : '100%';

    return (
        <Fragment>
            <Script
                strategy='beforeInteractive'
                onLoad={() => {
                    setIsRLoading(false);
                    setIsRReady(true);
                }}
                src='../../coi-service.js' />
            <div className="editorContainer">
                <EditorTopbar spinnerNeeded={runningCode}
                    defaultCode={defaultCode}
                    run={runR}
                    language='R'
                    {...props}
                />
                <EditorComponent code={Rcode.current}
                    onChange={onChange}
                    language='r'
                    height={height}
                    {...props}
                />
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


