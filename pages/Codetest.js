import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import PythonREPLComponent from '../components/Editor/PythonREPLComponent';
import CodeEditorComponent from '../components/Editor/PythonEditorComponent';
import UploadtoStorage from '../components/UploadtoStorage';
import EditorWithTabs from '../components/Editor/EditorWithTabs';
import { height } from '@mui/system';
// import HTMLEditorComponent from '../components/Editor/HTMLEditorComponent';
import fileList from '../components/Editor/FileList';
import JSTerminal from '../components/Editor/JSTerminal';
import REditorComponent from '../components/Editor/REditorComponent';
import JSEditorComponent from '../components/Editor/JSEditorComponent';
import Webvm from '../components/Webvm';

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
            <Webvm />
        </div>
    )

}

export async function getStaticProps() {
    // Get files from the workshops dir
    const getFilesandProcess = (dir) => {
      const dirents = fs.readdirSync(path.join(dir), { withFileTypes: true })
      const dirFiles = dirents
        .filter((file) => file.isFile())
        .map((file) => file.name);
      // Get slug and frontmatter from workshop
      const markdownFiles = dirFiles.map((filename) => {
        // Create slug
        const slug = filename.replace('.md', '')
  
        // Get frontmatter
        const markdownWithMeta = fs.readFileSync(
          path.join(dir, filename),
          'utf-8',
        )
        const itemPath = path.join(dir, filename).replace('.md', '')
  
        const matterResult = matter(markdownWithMeta)
        const content = matterResult.content
  
        return {
          slug,
          itemPath,
          content: content,
          ...matterResult.data,
        }
  
      })
      return markdownFiles
    }
    const workshopFiles = getFilesandProcess('document')
    const uploadsFiles = getFilesandProcess('uploads')
    const authorFiles = getFilesandProcess('authors')
  
    return {
      props: {
        workshop: workshopFiles[0],
        authors: authorFiles.sort(),
        uploads: uploadsFiles.sort(),
      },
    }
  }