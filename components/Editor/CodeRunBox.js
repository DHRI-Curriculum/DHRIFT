import React, { useState } from 'react';
import hljs from 'highlight.js'
import Button from '@mui/material/Button';
import 'highlight.js/styles/atom-one-dark.css'


function normalizeLanguage(lang) {
    if (!lang) return 'plaintext';
    const s = String(lang).toLowerCase().trim();
    switch (s) {
        case 'javascript':
        case 'js':
            return 'javascript';
        case 'python':
        case 'py':
            return 'python';
        case 'r':
            return 'r';
        case 'html':
        case 'xml':
            return 'xml';
        case 'bash':
        case 'shell':
        case 'sh':
        case 'zsh':
            return 'bash';
        case 'json':
            return 'json';
        case 'markdown':
        case 'md':
            return 'markdown';
        default:
            return s;
    }
}

export default function CodeRunBox(props) {
    const setCode = props.setCode;
    const setEditorOpen = props.setEditorOpen;
    const setActiveTab = props.setActiveTab;
    const lang = normalizeLanguage(props.language);

    // Map highlight.js language to editor tab name
    const getEditorTab = (language) => {
        const langLower = (language || '').toLowerCase();
        if (langLower === 'python' || langLower === 'py') return 'python';
        if (langLower === 'javascript' || langLower === 'js') return 'javascript';
        if (langLower === 'r') return 'r';
        if (langLower === 'bash' || langLower === 'shell') return 'computer';
        return langLower;
    };
    let highlighted = null;
    try {
        if (hljs.getLanguage(lang)) {
            highlighted = hljs.highlight(props.defaultCode, { language: lang, ignoreIllegals: true });
        } else {
            highlighted = hljs.highlightAuto(props.defaultCode);
        }
    } catch (e) {
        try {
            highlighted = hljs.highlightAuto(props.defaultCode);
        } catch (err) {
            highlighted = { value: props.defaultCode };
        }
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
                        if (setActiveTab) setActiveTab(getEditorTab(props.language));
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
                    if (setActiveTab) setActiveTab(getEditorTab(props.language));
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
