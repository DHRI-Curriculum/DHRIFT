import PythonREPLComponent from '../components/PythonREPLComponent';
import CodeEditorComponent from '../components/Editor/PythonEditorComponent';
import UploadtoStorage from '../components/UploadtoStorage';
import EditorWithTabs from '../components/Editor/EditorWithTabs';
import JSInterpreter from '../components/Editor/InterpreterComponent';
import { height } from '@mui/system';
import HTMLEditorComponent from '../components/Editor/HTMLEditorComponent';
import fileList from '../components/Editor/FileList';
import JSTerminal from '../components/Editor/JSTerminal';

export default function Test() {

    return (
        <div>
            <div
                dangerouslySetInnerHTML={
                    {
                        __html: `
                    <h1>REPL</h1>
                    `
                    }
                }
            />
            <div>
                {/* <PythonREPLComponent /> */}
            </div>
            <div
                dangerouslySetInnerHTML={
                    {
                        __html: `
                    <h1>Code Editor</h1>
                    `
                    }
                }
            >


            </div>
            <div>
                {/* <CodeEditorComponent 
                defaultCode='print("Hello world")'
                /> */}
                {/* <EditorWithTabs /> */}
            </div>
            {/* <FileList /> */}
            <div>
                {/* <JSInterpreter /> */}
            </div>
            <div>
                {/* <TerminalComponent /> */}
            </div>
            <div>
                {/* <HTMLEditor /> */}
            </div>
            <div>
                {/* <FileList files='mobydick.txt'/> */}
            </div>
            <JSTerminal />
        </div>
    )

}