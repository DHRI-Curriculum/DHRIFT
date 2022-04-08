import PythonREPLComponent from '../components/PythonREPLComponent';
import CodeEditorComponent from '../components/CodeEditorComponent';
import UploadtoStorage from '../components/UploadtoStorage';
import FileList from '../components/FileList';
import EditorWithTabs from '../components/EditorWithTabs';
import JSInterpreter from '../components/JSInterpreterComponent';
import { height } from '@mui/system';
import TerminalComponent from '../components/TerminalComponent';
import HTMLEditor from '../components/HTMLEditor';
import fileList from '../components/FileList';

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
        </div>
    )

}