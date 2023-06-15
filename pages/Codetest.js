import PythonREPLComponent from '../components/PythonREPLComponent';
import PythonEditorComponent from '../components/Editor/PythonEditorComponent';

// import FileList from '../components/Editor/FileList';
import EditorWithTabs from '../components/Editor/EditorWithTabs';
import { height } from '@mui/system';
import TerminalComponent from '../components/TerminalComponent';
import RRunner from '../components/Editor/RRunner';
// import HTMLEditor from '../components/Editor/HTMLEditorComponent';
import Script from 'next/script';

export default function Test() {

    return (

        <div>
            <Script src='../coi-service.js' />

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
            <div>
                {/* an iframe of a webvm instance */}
                <iframe src='https://www.zweibel.net/webvm'
                style={{
                    width: '600px',
                    height: '600px'
                }}
                sandbox='allow-scripts allow-same-origin allow-popups allow-forms allow-modals allow-top-navigation allow-downloads allow-pointer-lock allow-orientation-lock allow-presentation allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation'
                allow='cross-origin-isolated'

                />
                 
            </div>
        </div>
    )    
}
