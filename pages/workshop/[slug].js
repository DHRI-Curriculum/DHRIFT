import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import React, { useEffect, useState } from 'react'
import ConvertMarkdown from '../../components/ConvertMarkdown'
import { useRouter } from 'next/router'
import Sidebar from '../../components/Sidebar'
import FrontPage from '../../components/FrontPage';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Presentation from '../../components/Presentation';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Skeleton from '@mui/material/Skeleton';
import DrawerEditor from '../../components/Editor/DrawerEditor'
import { styled, useTheme } from '@mui/material/styles';
import ClassFacilitator from '../../components/ClassFacilitator'


const drawerWidth = '-30%';

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    }),
  }),
);


export default function WorkshopPage({
  workshop,
  authors,
  uploads,
  facilitators,
}) {

  const router = useRouter()
  const { slug } = router.query
  const currentFile = workshop
  const title = currentFile.title
  const content = currentFile.content
  const language = currentFile.programming_language

  // get front page content
  const [facilitatorOpen, setFacilitatorOpen] = useState(false);
  const frontPageContent = FrontPage(
    currentFile,
    {
      workshop,
      authors,
      uploads,
      facilitators,
    }, facilitatorOpen, setFacilitatorOpen)


  const [editorOpen, setEditorOpen] = useState(false);
  const [code, setCode] = useState('');

  // communicates with the editor to run code
  const [askToRun, setAskToRun] = useState(false);

  // convert markdown to html and split into pages
  // convert markdown to html and split into pages
  const htmlContent = function (content) {
    const htmlifiedContent = ConvertMarkdown(content, uploads, workshop, language, setCode, setEditorOpen, setAskToRun);
    // split react element array into pages
    const allPages = [];
    const pages = htmlifiedContent.props.children.reduce((acc, curr) => {
      // allPages = [[h1, p, p][h1, p, div]]
      if (typeof curr === 'string') {
        return acc;
      } else if (curr.type === 'h1') {
        allPages.push([curr]);
        // this changes from long pages to short ones 
        // } else if (curr.type === 'h2') {
        //   allPages.push([curr]);
      } else {
        allPages[allPages.length - 1].push(curr);
      }
      return acc;
    }, []);
    allPages.unshift(frontPageContent);

    return (
      allPages.map((page, index) => {  // page = [h1, p, p]
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
  const [currentContentLoaded, setCurrentContentLoaded] = useState(false);
  const [pageTitles, setPageTitles] = useState([]);
  const [currentHeader, setCurrentHeader] = useState(null);


  // list of page titles and highlight current page
  useEffect(() => {
    let mostRecentH1 = null;
    const pageTitlesGet = pages.map((page, index) => {
      let header = undefined;
      // if it's the frontpage vs not
      index === 0 ? header = "Introduction" : header = page.props.children[0].props.children.props.children[0]
      let tag = page.props.children[0].props.children.type;
      let parent = undefined;
      if (tag === 'h1') {
        mostRecentH1 = header;
      }
      if (tag === 'h2') {
        parent = mostRecentH1;
      }
      header = {
        title: header,
        index: index + 1,
        active: index + 1 === currentPage ? true : false,
        parent: parent
      }
      return (header)
    })
    setPageTitles(pageTitlesGet)
  }, [currentPage]);

  useEffect(() => {
    setPages(htmlContent(content));
    // setCurrentPage(1);
    const urlParams = new URLSearchParams(window.location.search);
    const page = Number(urlParams.get('page'));
    if (page) {
      setCurrentPage((page));
      setCurrentContent(pages[page - 1]);
      setCurrentContentLoaded(true);
    } else {
      setPages(htmlContent(content));
      setCurrentPage(1);
      setCurrentContentLoaded(true);
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
          className='pagination-button'
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
          className='pagination-button'
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
    router.push(`/workshop/${slug}/?page=${valueAsNumber}`, undefined, { shallow: true, scroll: false });
    setCurrentPage(valueAsNumber);
    setCurrentContent(pages[valueAsNumber - 1]);
  }

  return (
    <Container
      // maxWidth="lg"
      style={{
        display: 'flex',
      }}
    >
      <Main open={editorOpen}
        sx={{
          width: { xs: '100%', sm: 0, md: !editorOpen ? '100%' : '60%' },
        }}
      >
        {PaginationComponent(currentPage)}
        <div className="card-page">
          <div className="workshop-container">
            {currentContentLoaded ? (
              currentContent
            ) : (

              <div className='skeleton-container'
                style={{
                  width: '100%',
                  height: '100%',
                }}
              >
                <Skeleton variant="rect" width={'100%'} height={'50px'} />
                {
                  Array(content.split('\n').length).fill(<Skeleton variant="text" height='100%' width='100%' />)}
              </div>
            )}
            {PaginationComponent(currentPage)}

          </div>
        </div>
      </Main>
      {currentFile.programming_language &&
        <DrawerEditor
          drawerWidth={drawerWidth}
          open={editorOpen}
          setEditorOpen={setEditorOpen}
          text={code}
          setText={setCode}
          askToRun={askToRun}
          setAskToRun={setAskToRun}
          language={currentFile.programming_language}
          allUploads={uploads}
        />}
      <ClassFacilitator
        // You'll have to make state variables in the slug and pass them down
        name={facilitators}
        bio={'bio'}
        facilitatorOpen={facilitatorOpen}
        handleClose={() => setFacilitatorOpen(false)}
      />

    </Container>
  )
}
export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('document'))
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