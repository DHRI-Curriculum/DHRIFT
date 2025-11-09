import { useRef, useEffect } from "react";
import Script from "next/script";
import $ from 'jquery';
import 'jquery.terminal/js/jquery.terminal.min.js';
import 'jquery.terminal/css/jquery.terminal.min.css';

export default function JSTerminal() {

    // ref: https://stackoverflow.com/q/67322922/387194
    // var __EVAL = (s) => eval(`void (__EVAL = ${__EVAL.toString()}); ${s}`);

    const idRef = useRef(null);
    if (!idRef.current) {
        idRef.current = 'term-' + Math.random().toString(36).slice(2);
    }
    const termElRef = useRef(null);

    useEffect(() => {
        const id = idRef.current;
        const $el = $('#' + id);
        if ($el.length === 0) return;
        // Avoid double init in React refresh/hydration
        const existing = $el.data('terminal');
        if (!existing) {
            const term = $el.terminal(function (command) {
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
            termElRef.current = term;
        }
        return () => {
            try {
                const inst = $el.data('terminal');
                if (inst && typeof inst.destroy === 'function') {
                    inst.destroy();
                }
            } catch (e) {
                // ignore teardown errors
            }
        };
    }, []);

    return (
        <div className="terminal-container"
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
            }}
        >
            <div className="term" id={idRef.current}
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
