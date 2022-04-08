import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import React, { useEffect, useState } from 'react'
import ConvertMarkdown from '../../components/ConvertMarkdown'
import { useRouter } from 'next/router'
import FrontPage from '../../components/FrontPage'
import Sidebar from '../../components/Sidebar'
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Presentation from '../../components/Presentation';
import SlideoutEditor from '../../components/SlideoutEditor'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


export default function WorkshopPage({
  workshops,
  guides,
  insights,
  authors,
  snippets
}) {

  const router = useRouter()
  const { slug } = router.query
  const currentFile = workshops.find((workshop) => workshop.slug === slug)
  const title = currentFile.title
  const content = currentFile.content

  // get front page content
  const frontPageContent = FrontPage(
    currentFile,
    {
      workshops,
      guides,
      insights,
      authors
    })

  // convert markdown to html and split into pages
  const htmlContent = function (content) {
    const htmlifiedContent = ConvertMarkdown(content, snippets=snippets);
    // split react element array into pages
    const allPages = [];
    const pages = htmlifiedContent.props.children.reduce((acc, curr) => {
      // allPages = [[h1, p, p][h1, p, div]]
      if (typeof curr === 'string') {
        return acc;
      } else if (curr.type === 'h1') {
        allPages.push([curr]);
      } else {
        allPages[allPages.length - 1].push(curr);
      }
      return acc;
    }, []);
    allPages.unshift(frontPageContent);
    return (
      allPages.map((page, index) => {  // page = [h1, p, p]
        // if page classname is 'frontpage' then render frontpage
        if (page.props != undefined && page.props.className.includes('frontpage')) {
          return (
            frontPageContent
          )
        }
        return (
          <div key={index} className='page-content'>
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
  const [pages, setPages] = useState(htmlContent(content));
  const [currentContent, setCurrentContent] = useState([]);
  const [pageTitles, setPageTitles] = useState([]);
  const [currentHeader, setCurrentHeader] = useState(null);


      

  // list of page titles and highlight current page
  useEffect(() => {
    const pageTitlesGet = pages.map((page, index) => {
      let header = undefined;
      // if it's the frontpage vs not
      index === 0 ? header = "Introduction" : header = page.props.children[0].props.children.props.children[0]
      return (header)
    })
    setPageTitles(pageTitlesGet)
  }, [currentPage]);

  useEffect(() => {
    setPages(htmlContent(content));
    setCurrentPage(1);
    setCurrentContent(frontPageContent);
    const urlParams = new URLSearchParams(window.location.search);
    const page = Number(urlParams.get('page'));
    if (page) {
      setCurrentPage((page));
      setCurrentContent(pages[page - 1]);
    }
  }, [slug]);


  useEffect(() => {
    // check if current content has changed and get the current h1
    if (currentContent && currentContent != undefined) {
      setCurrentHeader(currentContent.props);
    }
  }, [currentContent])


  const PaginationComponent = (currentPage) => {
    return (
      <div className='pagination'>
        <Button
          className='previous-page'
          onClick={() => handlePageChange(event, Number(currentPage) - 1)}
          disabled={currentPage === 1}
        >
          <ArrowBackIcon />
          Previous
        </Button>
        <Sidebar
          pages={pageTitles}
          currentPage={currentPage}
          handlePageChange={handlePageChange}

        />
        <Presentation
          currentHeader={currentHeader}
          content={currentFile}
          title={title}
        />
        <Button
          className='next-page'
          onClick={() => handlePageChange(event, Number(currentPage) + 1)}
          disabled={currentPage === pages.length}
        >
          Next
          <ArrowForwardIcon />
        </Button>
      </div>
    )
  }


  const handlePageChange = (event, value) => {
    // scroll smoothly to top of page
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    const valueAsNumber = Number(value);
    router.push(`/workshops/${slug}/?page=${valueAsNumber}`, undefined, { shallow: true, scroll: false });
    setCurrentPage(valueAsNumber);
    setCurrentContent(pages[valueAsNumber - 1]);
  }

  return (
    <Container
      maxWidth="xl"
      style={{
        display: 'flex',
        marginTop: '1rem',
      }}
    >
      <div className="content card-page">
        <div className="workshop-container">
          {PaginationComponent(currentPage)}
          {currentContent}
          {PaginationComponent(currentPage)}
          <SlideoutEditor />
        </div>
      </div>
    </Container>
  );
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('workshops'))
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
  const snippetsFiles = getFilesandProcess('snippets')
  const installFiles = getFilesandProcess('guides')
  const insightsFiles = getFilesandProcess('insights')
  const authorFiles = getFilesandProcess('authors')

  return {
    props: {
      workshops: workshopFiles.sort(),
      guides: installFiles.sort(),
      insights: insightsFiles.sort(),
      authors: authorFiles.sort(),
      snippets: snippetsFiles.sort(),
    },
  }
}