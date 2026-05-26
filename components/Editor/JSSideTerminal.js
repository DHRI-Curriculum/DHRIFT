import { useRef, useState, useReducer, useEffect } from "react";
import Script from "next/script";
import $ from 'jquery';
import 'jquery.terminal/js/jquery.terminal.min.js';
import 'jquery.terminal/css/jquery.terminal.min.css';

export default function JSSideTerminal(props) {

    const [theWindow, setWindow] = useState(null);
    const showInteractiveTerminal = false; // Flag to control rendering

    // ref: https://stackoverflow.com/q/67322922/387194
    // var __EVAL = (s) => eval(`void (__EVAL = ${__EVAL.toString()}); ${s}`);


    let error = props.error;
    let errorString;
    if (error) {
        errorString = error.stack ? error.stack : error.toString();
    }

    var randomID = Math.random().toString(36).substring(7);
  
    // useEffect(() => {
    //     var term = $('#' + randomID).terminal(function (command) {
    //         if (command !== '') {
    //             try {
    //                 var result = __EVAL(command);
    //                 if (result !== undefined) {
    //                     this.echo(new String(result));
    //                 }
    //             } catch (e) {
    //                 this.error(new String(e));
    //             }
    //         } else {
    //             this.echo('');
    //         }
    //     }, {
    //         tabindex: 0,
    //         greetings: '',
    //         prompt: '> ',
    //         enabled: false,
    //         focus: false,
    //         height: '100%', // Changed from 100vh
    //         overflowY: 'scroll',
            
    //     });
    //     // term.focus();
    //     return () => term.destroy();
    // }, []);


    useEffect(() => {
        // Error state is handled by parent component
    }, [props.error])


    return (
        <div className="terminal-container">
            <div className='repl-header'>
                <h3>Console</h3>
            </div>
            <div className='console'>
                {props.consoleRef.current}
                <span className="console-error">{errorString}</span>
            </div>
            {showInteractiveTerminal && (
                <>
                    <div className="side-terminal" id={randomID} />
                    <Script dangerouslySetInnerHTML={{
                        __html: `var __EVAL = (s) => eval(\`void (__EVAL = \${__EVAL.toString()}); \${s}\`);`
                    }} />
                </>
            )}
        </div>
    );
}
