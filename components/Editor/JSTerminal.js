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
        var term = $('#'+ randomID).terminal(function(command) {
            if (command !== '') {
                try {
                    var result = __EVAL(command);
                    if (result !== undefined) {
                        this.echo(new String(result));
                    }
                } catch(e) {
                    this.error(new String(e));
                }
            } else {
               this.echo('');
            }
        }, {
            tabindex: 0,
            greetings: '',
            prompt: '> '
        });
        term.focus();
        return () => term.destroy();
    }, []);

    return (
        <div className="terminal-container"
        style={{
            width: '50%',
            height: '100%',
            minWidth: '400px',

        }}
        >

            <div className="term" id={randomID}
            style={{
                width: '100%',
                height: '100%',
                border: '1px solid #ccc',
                borderRadius: '5px',
                overflow: 'hidden',
                backgroundColor: '#fff'
            }}
            />
            <Script dangerouslySetInnerHTML={{__html: `
            var __EVAL = (s) => eval(\`void (__EVAL = \${__EVAL.toString()}); \${s}\`);
            `}} />   
        </div>
    );
}