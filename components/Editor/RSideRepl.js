import { useRef, useEffect, useState, useContext, useReducer, Fragment } from 'react';
import { Console } from '@r-wasm/webr';
import Script from 'next/script';

// Explicitly set the webR base URL to the webR npm package directory
// const webR = new WebR();

export default function RSideRepl({ defaultCode, minLines, codeOnChange, ...props }) {
    
const [stdin, setStdin] = useState('');
const [stdout, setStdout] = useState('');
const [stderr, setStderr] = useState('');
const [result, setResult] = useState(['Loading webR...']);

    const webRConsole = new Console({
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
            <Script src='../coi-service.js' />
        <div>
      <pre><code id="out">{props.output}</code></pre>
      <input id="input" type="text" value={stdin} onChange={e => setStdin(e.target.value)} />
      
      <button onClick="globalThis.sendInput()" id="run">Run</button>
    </div>
        </Fragment>
    )
}