import React, { useState } from 'react';
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'


export default function CodeRunBox(props) {

    const setCode = props.setCode;
    const setEditorOpen = props.setEditorOpen;

    const highlighted = hljs.highlight(props.defaultCode, { language: props.language, ignoreIllegals: true });
    const getLang = hljs.getLanguage(highlighted.language).name

    return (
        <div className='code-run-box'>
            <div className='code-run-box-code'>
                <pre className='hljs'>
                    <code className='code-run-box-code'
                        dangerouslySetInnerHTML={{ __html: highlighted.value }}>
                    </code>
                </pre>
            </div>
            <button
                className='code-run-box-button'
                onClick={() => {
                    setCode(props.defaultCode);
                    setEditorOpen(true);
                    props.setAskToRun(true);
                }}
            >
                Run Code >>
            </button>
        </div>

    )
}