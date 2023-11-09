import React, { useState } from 'react';
import hljs from 'highlight.js'
import Button from '@mui/material/Button';
import 'highlight.js/styles/atom-one-dark.css'


export default function CodeRunBox(props) {
    const setCode = props.setCode;
    const setEditorOpen = props.setEditorOpen;
    let highlighted = null;
    try{
    highlighted = hljs.highlight(props.defaultCode, { language: props.language, ignoreIllegals: true });
    } catch (e) {
        console.log(e);
        highlighted = props.defaultCode;
    }

    var returnedComponent = null;
    if (highlighted != null && highlighted.value) {
        returnedComponent = (
            <div className='code-run-box'>
                <div className='code-run-box-code'>
                    <pre className=''>
                        <code className='code-run-box-code hljs'
                            dangerouslySetInnerHTML={{ __html: highlighted.value }}>
                        </code>
                    </pre>
                </div>
                <Button
                    className='button button-bark'
                    onClick={() => {
                        setCode(props.defaultCode);
                        setEditorOpen(true);
                        props.setAskToRun(true);
                    }}
                >
                    Run Code
                </Button>
            </div>
        )
    }
    else {
        returnedComponent = (
            <Button
                className='button button-bark'
                onClick={() => {
                    setCode(props.defaultCode);
                    setEditorOpen(true);
                    props.setAskToRun(true);
                }}
            >
                Open Editor
            </Button>
        )
    }

    return returnedComponent;
}
