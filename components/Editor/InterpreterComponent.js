import ReactDOM from 'react-dom';
import CodeEditorComponent from './PythonEditorComponent';
import JSEditorComponent from './JSEditorComponent';
import CodeRunBox from './CodeRunBox';
import { useRef, useEffect, useState, useContext, useReducer } from 'react';



export default function InterpreterComponent(props) {
    if (props.language && props.language.toLowerCase() === 'python') {
        return (
            <CodeRunBox
                {...props}
            />
        )
    }
    else if (props.language && props.language.toLowerCase() === 'javascript') {
        return (
            <JSEditorComponent
                {...props}
            />
        )
    }
    else {
        return (
            <CodeEditorComponent
                {...props}
            />

        )
    }
}