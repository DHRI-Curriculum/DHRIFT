import { useRef, useState, useReducer, useEffect } from "react";
import Script from "next/script";
import $ from 'jquery';
import 'jquery.terminal/js/jquery.terminal.min.js';
import 'jquery.terminal/css/jquery.terminal.min.css';

export default function JSTerminal() {

    // ref: https://stackoverflow.com/q/67322922/387194
    // var __EVAL = (s) => eval(`void (__EVAL = ${__EVAL.toString()}); ${s}`);

    var randomID = Math.random().toString(36).substring(7);

    useEffect(() => {
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
            focus: false
        });
        // term.focus();
        return () => term.destroy();
    }, []);

    return (
        <div className="terminal-container"
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
            }}
        >
            <div className="term" id={randomID}
                style={{
                    width: '50%',
                    height: '100%',
                    border: '2px solid #ef3b3a',
                    fontWeight: 'bold',
                    backgroundColor: '#fff',
                    marginTop: '10px',
                    marginBottom: '20px',
                }}
            />
            <Script dangerouslySetInnerHTML={{
                __html: `
            var __EVAL = (s) => eval(\`void (__EVAL = \${__EVAL.toString()}); \${s}\`);
            `}} />
        </div>
    );
}