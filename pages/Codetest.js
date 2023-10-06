import React from 'react';
// import HTMLEditorComponent from '../components/Editor/HTMLEditorComponent';
import fileList from '../components/Editor/FileList';
import JSTerminal from '../components/Editor/JSTerminal';
import REditorComponent from '../components/Editor/REditorComponent';
import JSEditorComponent from '../components/Editor/JSEditorComponent';
import Webvm from '../components/Wasm/Webvm';
// import MDX from '../components/WorkshopPieces/MDX';
// import useWorkshop from '../components/Hooks/UseWorkshop';

// const workshop = useWorkshop('szweibel', 'https://api.github.com/repos/szweibel/workshops/contents/python.md', false)

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
                {/* <TerminalComponent /> */}
            </div>
            <div>
                {/* <HTMLEditor /> */}
            </div>
            <div>
                {/* <FileList files='mobydick.txt'/> */}
            </div>
            {/* <JSTerminal /> */}
            {/* {<REditorComponent />} */}
            {/* {<JSEditorComponent/>} */}
            {/* <Webvm /> */}
            <div>
                {/* <MDX mdxContent={`
# Hello world
## Hello world
### Hello world
`}/> */}
            </div>
        </div>
    )

}
