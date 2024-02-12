import React, { use } from 'react';
import { useEffect, useState } from 'react';
// import HTMLEditorComponent from '../components/Editor/HTMLEditorComponent';
import fileList from '../components/Editor/FileList';
import JSTerminal from '../components/Editor/JSTerminal';
import REditorComponent from '../components/Editor/REditorComponent';
import JSEditorComponent from '../components/Editor/JSEditorComponent';
import MDX from '../components/WorkshopPieces/MDX';
import useWorkshop from '../components/Hooks/UseWorkshop';


export default function Test() {
    // let data = useWorkshop('dhri-curriculum', 'python', 'https://api.github.com/repos/dhri-curriculum/workshops/contents/python.md', true)
    // const [mdxContent, setMdxContent] = useState(null)
    // const [processedContent, setProcessedContent] = useState(null)
    // useEffect(() => {
    //     const getMDX = async () => {
    //         if (data) {
    //             let processed = await MDX({ content: data })
    //             setProcessedContent(processed)
    //         }
    //     }
    //     getMDX()
    // }, [data])

    // useEffect(() => {
    //     console.log('processedContent', processedContent)
    // }, [processedContent])

    return (
        <div>
            <h1>Test</h1>
            <div>
              {/* {processedContent?.result && processedContent.result} */}
            {/* <HTMLEditorComponent /> */}
            </div>
        </div>
    )

}
