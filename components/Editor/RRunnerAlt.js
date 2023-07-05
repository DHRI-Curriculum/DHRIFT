import { useRef, useEffect, useState, useContext, useReducer, Fragment } from 'react';
import { WebR } from '@r-wasm/webr';

// Explicitly set the webR base URL to the webR npm package directory
const webR = new WebR();

export default function RRunnerAlt({ defaultCode, minLines, codeOnChange, ...props }) {
    
const [stdin, setStdin] = useState('');
const [stdout, setStdout] = useState('');
const [stderr, setStderr] = useState('');
const [result, setResult] = useState(['Loading webR...']);

    const webRConsole = new webR.Console({
      stdout: line => setStdout(stdout + line + '\n'),
      stderr: line => setStderr(stderr + line + '\n'),
        prompt: p => setStdout(stdout + p),
    });


    webRConsole.run();
    
    /* Write to the webR console using the ``stdin()`` method */

    globalThis.sendInput = () => {
      webRConsole.stdin(stdin);
    //   document.getElementById('out').append(input.value + '\n');
    setResult(result + input.value + '\n');
      input.value = "";
    }
    

    return (
        <Fragment>
        <div>
      <pre><code id="out">Loading webR, please wait...</code></pre>
      <input id="input" type="text" value={stdin} onChange={e => setStdin(e.target.value)} />
      
      <button onClick="globalThis.sendInput()" id="run">Run</button>
    </div>
        </Fragment>
    )
}