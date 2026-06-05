import React from 'react';
import Button from '@mui/material/Button';
import 'highlight.js/styles/atom-one-dark.css'
import highlighter, { normalizeHighlightLanguage } from '../../utils/dhriftHighlighter';
import { createRunRequest } from './runRequest';

export default function CodeRunBox(props) {
    const setCode = props.setCode;
    const setEditorOpen = props.setEditorOpen;
    const setActiveTab = props.setActiveTab;
    const lang = normalizeHighlightLanguage(props.language);
    const configuredEditors = Array.isArray(props.editors)
        ? props.editors.map((editor) => String(editor).toLowerCase())
        : [];
    const hasConfiguredEditor = (editor) => configuredEditors.includes(editor);

    // Map highlight.js language to editor tab name
    const getEditorTab = (language) => {
        const langLower = (language || '').toLowerCase();
        if (langLower === 'python' || langLower === 'py') return 'python';
        if (langLower === 'javascript' || langLower === 'js') {
            if (configuredEditors.length > 0 && !hasConfiguredEditor('javascript')) {
                if (hasConfiguredEditor('html_css')) return 'html_css';
                if (hasConfiguredEditor('html')) return 'html';
            }
            return 'javascript';
        }
        if (langLower === 'r') return 'r';
        if (langLower === 'html' || langLower === 'css') {
            if (hasConfiguredEditor('html_css')) return 'html_css';
            if (hasConfiguredEditor('html')) return 'html';
        }
        if (langLower === 'bash' || langLower === 'shell') return 'computer';
        return langLower;
    };
    const requestRun = () => {
        const editorTab = getEditorTab(props.language);
        setCode(props.defaultCode);
        if (setActiveTab) setActiveTab(editorTab);
        setEditorOpen(true);
        props.setAskToRun((previousRequest) => createRunRequest(previousRequest, {
            code: props.defaultCode,
            language: props.language,
            editorTab,
        }));
    };

    let highlighted = null;
    try {
        if (highlighter.getLanguage(lang)) {
            highlighted = highlighter.highlight(props.defaultCode, { language: lang, ignoreIllegals: true });
        } else {
            highlighted = highlighter.highlightAuto(props.defaultCode);
        }
    } catch (e) {
        try {
            highlighted = highlighter.highlightAuto(props.defaultCode);
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
                    onClick={requestRun}
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
                onClick={requestRun}
            >
                Open Editor
            </Button>
        )
    }

    return returnedComponent;
}
