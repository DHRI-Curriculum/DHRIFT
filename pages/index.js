import fs from 'fs'
import path from 'path'
import React, { useEffect, useState } from 'react'
import ConvertMarkdown from '../components/ConvertMarkdown'
import matter from 'gray-matter'
import FrontPage from '../components/FrontPage';
import Markdown, { compiler } from 'markdown-to-jsx';
// import yaml from '../config.yml'
import logo from '../public/images/logos/logo.png'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';
import TocIcon from '@mui/icons-material/Toc';


export default function Home({ workshop, authors }) {

  const content = workshop.content;
  const description = workshop.description;
  const title = workshop.title;

  const frontPageContent = FrontPage(
    workshop,
    {
      workshop,
      authors,
    
    })


  // convert markdown to html and split into pages
  const htmlContent = function (content) {
    const htmlifiedContent = ConvertMarkdown(content);
    // split react element array into pages
    const allPages = [];
    const pages = htmlifiedContent.props.children.reduce((acc, curr) => {
      // allPages = [[h1, h2, h2][h1, h2]]
      if (typeof curr === 'string') {
        return acc;
      } else if (curr.type === 'h1') {
        allPages.push([curr]);
      } else if (curr.type === 'h2') {
        allPages[allPages.length - 1].push(curr);
      }
      return acc;
    }, []);
    return (
      allPages);
  }


  const [pages, setPages] = useState(htmlContent(content));

  let whichChapter = 1;
  const tableOfContents = pages.map((page, index) => {
    let subPages = 0;
    return (
      page.map((item, index) => {
        if (subPages > 4) {
          return null;
        }
        if (item.type === 'h1') {
          whichChapter++;
          return (
            <Typography key={index} variant="h4" style={{ margin: '0.5rem 0' }}>
              <a href={`workshop/${workshop.slug}/?page=${whichChapter}`}>{whichChapter}. {item.props.children}</a>
            </Typography>
          )
        } else if (item.type === 'h2') {
          subPages++;
          if (subPages > 4) {
            return (
              '...'
            )
          } else {
            // if not last item 
            if (index !== page.length - 1) {
              return (
                <span key={index} >{item.props.children} / </span>
              )
            } else {
              return (
                <span key={index}>{item.props.children}</span>
              )
            }
          }
        }
      })
    )
  })
  tableOfContents.unshift(
    <Typography key={0} variant="h4" style={{ margin: '0.5rem 0' }}>
    <a href={`workshop/${workshop.slug}/?page=${1}`}>1. Frontmatter</a>
  </Typography>
  );

  return (
    <div className='container'>
      <div className='frontpage'>
        <div>
          <div className='frontpage-top'>
            <div className='titleContainer'>
              <h2
                style={{
                  fontFamily: 'Titillium Web',
                }}
                className='title'>{title}</h2>
              <h2
                style={{
                  fontFamily: 'Titillium Web',
                  fontWeight: '400',
                }}
                className='lineUp'>
              </h2>
              
            </div>

            <Image
              src={logo}
              alt={'logo'}

              className='frontpage-logo' />
          </div>
          {description &&
            <div className='intro'>
              <div className='sectionTitle'>Description</div>
              <p className='intro-text'><Markdown>{description}</Markdown></p>
            </div>
          }
        </div>
        <div className='sectionTitle'><TocIcon /> Table of Contents</div>
        <div className='workshops'>
          <ul>
            {tableOfContents}
          </ul>
        </div>
      </div>
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

      const matterResult = matter(markdownWithMeta)
      const content = matterResult.content
      return {
        slug,
        content: content,
        ...matterResult.data,
      }

    })
    return markdownFiles
  }
  const workshopFiles = getFilesandProcess('document')
  const authorFiles = getFilesandProcess('authors')

  return {
    props: {
      workshop: workshopFiles[0],
      authors: authorFiles.sort(),
    },
  }
}
