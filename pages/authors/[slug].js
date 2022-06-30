import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import ConvertMarkdown from '../../components/ConvertMarkdown'
import { Glossary } from '../../components/Glossary'
import { useRouter } from 'next/router'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import hljs from 'highlight.js';
import Image from 'next/image'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

export default function AuthorPage({
    workshops,
    guides,
    insights,
    authors
}) {

    const router = useRouter()
    const { slug } = router.query
    const currentFile = authors.find((author) => author.slug === slug)
    const content = currentFile.content

   // convert markdown to html and split into pages
  const htmlContent = function (content) {
    const htmlifiedContent = ConvertMarkdown(content);
    // split react element array into pages
    const allPages = [];

    const pages = htmlifiedContent.props.children.reduce((acc, curr) => {
      // allPages = [[h1, p, p][h1, p, div]]
      if (typeof curr === 'string') {
        return acc;
      }else if (curr.type === 'h1') {
        allPages.push([curr]);
      } else {
        allPages[allPages.length - 1].push(curr);
      }
      return acc;
    }, []);
    return (
      allPages.map((page, index) => {  // page = [h1, p, p]
        return (
          <div key={index}>
            {page.map((element, index) => {
              return (
                <React.Fragment key={index}>
                  {element}
                </React.Fragment>
              )
            }
            )}
          </div>
        )
      }
      )
    )
  }

  // set defaults 
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState([]);
  const [currentContent, setCurrentContent] = useState([]);
  const [pageTitles, setPageTitles] = useState([]);

  // list of page titles and highlight current page
  const getPageTitles = pages.map((page, index) => {
    let header = undefined;
    // if it's the frontpage vs not
    index === 0 ? header = page.props.children[0].props.children : header = page.props.children[0].props.children.props.children[0]
    return (
      <li key={index}>
        <a className={currentPage === index + 1 ? 'active' : ''} onClick={() => handlePageChange(event, index + 1)}>{header}</a>
      </li>
    )
  })

  useEffect(() => {
    setPages(htmlContent(content));
    setCurrentContent(htmlContent(content)[0]);
    setPageTitles(getPageTitles);
  }, [content]);

  return (
    <Container
      disableGutters = {true}
      maxWidth="xl"
      style={{ display: 'flex',
    marginTop: '1rem', }}
    >
      <div className="content card-page">
        <div className="workshop-container">
          {currentContent}
        </div>
      </div>
    </Container>
  );
}

export async function getStaticPaths() {
    const files = fs.readdirSync(path.join('authors'))
    const paths = files.map((filename) => ({
        params: {
            slug: filename.replace('.md', ''),
        },
    }))
    return {
        paths,
        fallback: false,
    }
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
    const workshopFiles = getFilesandProcess('workshops')
    const installFiles = getFilesandProcess('guides')
    const insightsFiles = getFilesandProcess('insights')
    const authorFiles = getFilesandProcess('authors')

    return {
        props: {
            workshops: workshopFiles.sort(),
            guides: installFiles.sort(),
            insights: insightsFiles.sort(),
            authors: authorFiles.sort()
        },
    }
}