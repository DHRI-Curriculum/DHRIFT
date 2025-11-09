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
        if (props.error) {
            console.log(props.error)
        }
    }, [props.error])


    return (
        <div className="terminal-container"
            style={{
                display: 'flex',
                flexDirection: 'column',
                // justifyContent: 'center', // Removed
                // height: '77%', // Removed
                flex: 1, // Make JSSideTerminal a flex child
                minHeight: '0', // Allow shrinking
                overflow: 'hidden' // Prevent its own scrollbars if children manage theirs
            }}
        >
            <div className='repl-header'>
                <h3>Console</h3>
            </div>
            <div className='console' style={{ 
                whiteSpace: 'pre-wrap', 
                overflowY: 'auto', 
                border: '1px solid #ccc', 
                padding: '5px', 
                marginBottom: '5px',
                flex: '1', // Takes all available flex space
                minHeight: '100px', // Ensure it has some minimum height
                boxSizing: 'border-box'
            }}>
                {props.consoleRef.current}
                <span className="console-error">{errorString}</span>
            </div>
            {showInteractiveTerminal && (
                <>
                    <div className="side-terminal" id={randomID}
                        style={{
                            // Styles for when/if it becomes visible again.
                            // These can be adjusted later. For now, ensuring it's a block
                            // and can take space if 'showInteractiveTerminal' is true.
                            width: '100%',
                            flex: '1', // Example style if it were to take space
                            minHeight: '50px', 
                            display: 'block', 
                            boxSizing: 'border-box'
                        }}
                    />
                    {/* Script for __EVAL is tied to the interactive terminal's functionality */}
                    <Script dangerouslySetInnerHTML={{
                        __html: `
                    var __EVAL = (s) => eval(\`void (__EVAL = \${__EVAL.toString()}); \${s}\`);
                    `}} />
                </>
            )}
        </div>
    );
}
