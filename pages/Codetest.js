import PythonREPLComponent from '../components/PythonREPLComponent';
import PythonEditorComponent from '../components/Editor/PythonEditorComponent';

// import FileList from '../components/Editor/FileList';
import EditorWithTabs from '../components/Editor/EditorWithTabs';
import { height } from '@mui/system';
import TerminalComponent from '../components/TerminalComponent';
import RRunner from '../components/Editor/RRunner';
// import HTMLEditor from '../components/Editor/HTMLEditorComponent';

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
            <div>
                <RRunner />
            </div>
        </div>
    )

}