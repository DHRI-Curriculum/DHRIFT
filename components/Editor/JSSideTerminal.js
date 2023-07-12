import { useRef, useState, useReducer, useEffect } from "react";
import Script from "next/script";
import $ from 'jquery';
import 'jquery.terminal/js/jquery.terminal.min.js';
import 'jquery.terminal/css/jquery.terminal.min.css';

export default function JSSideTerminal(props) {

    const [theWindow, setWindow] = useState(null);

    // ref: https://stackoverflow.com/q/67322922/387194
    // var __EVAL = (s) => eval(`void (__EVAL = ${__EVAL.toString()}); ${s}`);


    let error = props.error;
    let errorString
    if (error) {
     errorString = error.toString();
    }

    var randomID = Math.random().toString(36).substring(7);

    useEffect(() => {
        setWindow(window);
    }, []);

    useEffect(() => {
        if (theWindow !== null) {
            try {
                var term = $('#' + randomID).terminal(function (command) {
                    if (command !== '') {
                        try {
                            var result = __EVAL(command);
                            if (result !== undefined) {
                                this.echo(new String(result));
                            }
                        } catch (e) {
                            this.error(new String(e));
                        }
                    } else {
                        this.echo('');
                    }
                }, {
                    tabindex: 0,
                    greetings: '',
                    prompt: '> ',
                    enabled: false,
                    focus: false,
                    historyState: true,
                });
                // term.focus();
                return () => term.destroy();
            } catch (error) {
                console.log(error);
            }
        }
    }, [theWindow]);


    useEffect(() => {
    console.log(props.error)
    }, [props.error])
        

    return (
        <div className="terminal-container"
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                height: '100%',
            }}
        >
            <div className='repl-header'>
                <h1>Console</h1>
            </div>
            <div className='console'>
            {props.consoleRef.current}
            <span className="console-error">{errorString}</span>
            </div>
            <div className="side-terminal" id={randomID}
                style={{
                    width: '100%',
                    height: '100%',
                    overflow: 'none',
                }}
            />
            <Script dangerouslySetInnerHTML={{
                __html: `
            var __EVAL = (s) => eval(\`void (__EVAL = \${__EVAL.toString()}); \${s}\`);
            `}} />
        </div>
    );
}