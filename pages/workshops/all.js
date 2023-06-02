import React from 'react'
import Workshop from '../../components/MenuItem'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import ConvertMarkdown from '../../components/ConvertMarkdown'

export default function AllWorkshops({ workshops, allFiles }) {
  return (
    <div className='container'
    style={{
        paddingTop: '2rem',
    }}
    >
      {workshops.map((workshop, index) => {
        return (
          <Workshop workshop={workshop} index={index} key={index} />
        )
      })}
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
    const workshopFiles = getFilesandProcess('workshops')
    const uploadsFiles = getFilesandProcess('uploads')
    const installFiles = getFilesandProcess('guides')
    const insightsFiles = getFilesandProcess('insights')
    const authorFiles = getFilesandProcess('authors')
  
    return {
      props: {
        workshops: workshopFiles.sort(),
        guides: installFiles.sort(),
        insights: insightsFiles.sort(),
        authors: authorFiles.sort(),
        uploads: uploadsFiles.sort(),
      },
    }
  }