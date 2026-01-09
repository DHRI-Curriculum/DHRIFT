import { useRef, useEffect, useState } from "react";
import $ from 'jquery';
import 'jquery.terminal/js/jquery.terminal.min.js';
import 'jquery.terminal/css/jquery.terminal.min.css';

export default function JSTerminal() {
    const idRef = useRef(null);
    if (!idRef.current) {
        idRef.current = 'term-' + Math.random().toString(36).slice(2);
    }
    const termElRef = useRef(null);
    const evalRef = useRef(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        // Create the eval function in module scope to persist across commands
        // This pattern allows eval to maintain variable state between executions
        // ref: https://stackoverflow.com/q/67322922/387194
        if (!evalRef.current) {
            evalRef.current = (s) => {
                // Use indirect eval for global scope access
                return (0, eval)(s);
            };
        }

        const id = idRef.current;
        const $el = $('#' + id);
        if ($el.length === 0) return;

        // Avoid double init in React refresh/hydration
        const existing = $el.data('terminal');
        if (!existing) {
            const evalFn = evalRef.current;
            const term = $el.terminal(function (command) {
                if (command !== '') {
                    try {
                        const result = evalFn(command);
                        if (result !== undefined) {
                            this.echo(String(result));
                        }
                    } catch (e) {
                        this.error(String(e));
                    }
                } else {
                    this.echo('');
                }
            }, {
                tabindex: 0,
                greetings: 'JavaScript Console — Type JavaScript commands and press Enter\n',
                prompt: '> ',
                enabled: true,
                checkArity: false,
                historySize: 100,
                outputLimit: 500,
            });
            termElRef.current = term;
            setIsReady(true);
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

    const handleClick = () => {
        if (termElRef.current) {
            termElRef.current.focus();
        }
    };

    return (
        <div
            className="js-terminal-wrapper"
            onClick={handleClick}
        >
            <div className="js-terminal-header">
                <span className="js-terminal-dot js-terminal-dot--red" />
                <span className="js-terminal-dot js-terminal-dot--yellow" />
                <span className="js-terminal-dot js-terminal-dot--green" />
                <span className="js-terminal-title">JavaScript Console</span>
            </div>
            <div className="js-terminal-body" id={idRef.current} />
        </div>
    );
}
