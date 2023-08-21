// pages/404.js
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export default function Custom404() {
    return <h1>404 - Page Not Found</h1>
  }

  export async function getStaticProps() {
    // Get files from the authors dir
    const getFilesandProcess = (dir) => {
        const dirents = fs.readdirSync(path.join(dir), { withFileTypes: true })
        const dirFiles = dirents
            .filter((file) => file.isFile())
            .map((file) => file.name);
        // Get slug and frontmatter from author
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
  
    return {
        props: {
            workshop: workshopFiles[0],
           
         
        },
    }
}