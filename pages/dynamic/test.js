'use client'
import matter from 'gray-matter'
import React, { useEffect, useState } from 'react'
import ConvertMarkdown from '../../components/ConvertMarkdown'
import { useRouter } from 'next/router'
import Sidebar from '../../components/Sidebar'
import FrontPage from '../../components/FrontPage';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
// import Presentation from '../../components/Presentation';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Skeleton from '@mui/material/Skeleton';
import DrawerEditor from '../../components/Editor/DrawerEditor'
import { styled, useTheme } from '@mui/material/styles';
import ClassFacilitator from '../../components/ClassFacilitator'
import useSWR from 'swr'

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
  // facilitators,
}) {
  const [content, setContent] = useState('');
  const [htmlContent, setHtmlContent] = useState('');
  const [currentFile, setCurrentFile] = useState(null);
  const [currentContent, setCurrentContent] = useState([]);
  const [title, setTitle] = useState('');
  const [language, setLanguage] = useState('');
  const [currentContentLoaded, setCurrentContentLoaded] = useState(false);
  const [pageTitles, setPageTitles] = useState([]);
  const [currentHeader, setCurrentHeader] = useState(null);
  const [editorOpen, setEditorOpen] = useState(false);

  const router = useRouter()
  const { slug } = router.query
  const fetcher = (...args) => fetch(...args).then(res => res.text())

  function useWorkshop() {
    const { data, error } = useSWR(`https://raw.githubusercontent.com/DHRI-Curriculum/DHRIFT/main/workshops/html-css.md`, fetcher)
    return {
      data: data,
      isLoading: !error && !data,
      isError: error
    }
  }
  const { data, isLoading, isError } = useWorkshop()

  // get front page content
  // const [facilitatorOpen, setFacilitatorOpen] = useState(false);
  // const frontPageContent = FrontPage(
  //   currentFile,
  //   {
  //     workshop,
  //     authors,
  //     uploads,
  //     // facilitators,
  //   })




  // convert markdown to html and split into pages

  const convertContenttoHTML = function (content) {
    const htmlifiedContent = ConvertMarkdown(content, uploads, workshop, language, setCode, setEditorOpen, setAskToRun);
    // split react element array into pages
    const allPages = [];
    const pages = htmlifiedContent?.props.children.reduce((acc, curr) => {
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

    // allPages.unshift(frontPageContent);

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
  const [code, setCode] = useState(null);
  // communicates with the editor to run code
  const [askToRun, setAskToRun] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState([]);

  if (data && !currentFile && typeof (data) === 'string') {
    // setCurrentFile(matter(data))
    const matterResult = matter(data)
    setCurrentFile(matterResult)
    setContent(matterResult.content)
    setPages(convertContenttoHTML(matterResult.content));
    setTitle(matterResult.data.title);
    setLanguage(matterResult.data.programming_language);
  }

  // list of page titles and highlight current page
  useEffect(() => {
    let mostRecentH1 = null;
    const pageTitlesGet = pages.map((page, index) => {
      let header = undefined;
      // if it's the frontpage vs not
      index === 0 ? header = "Frontmatter" : header = page.props.children[0].props.children.props.children[0]
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
    // setCurrentPage(1);
    const urlParams = new URLSearchParams(window.location.search);
    const page = Number(urlParams.get('page'));
    if (page) {
      setCurrentPage((page));
      setCurrentContent(pages[page - 1]);
      setCurrentContentLoaded(true);
    } else {
      // setPages(convertContenttoHTML(content));
      setCurrentContent(pages[0]);
      setCurrentPage(1);
      setCurrentContentLoaded(true);
    }
  }, [pages])

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
        {/* <Presentation
          currentHeader={currentHeader}
          content={currentFile}
          title={title}
        /> */}
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
    // router.push(`/workshop/${slug}/?page=${valueAsNumber}`, undefined, { shallow: true, scroll: false });
    setCurrentPage(valueAsNumber);
    setCurrentContent(pages[valueAsNumber - 1]);
  }

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error...</div>

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
                  Array(content?.split('\n').length).fill(<Skeleton variant="text" height='100%' width='100%' />)}
              </div>
            )}
            {PaginationComponent(currentPage)}

          </div>
        </div>
      </Main>
      {language && 
        <DrawerEditor
          drawerWidth={drawerWidth}
          open={editorOpen}
          setEditorOpen={setEditorOpen}
          text={code}
          setText={setCode}
          askToRun={askToRun}
          setAskToRun={setAskToRun}
          language={language}
          allUploads={uploads}
        />}
      {/* <ClassFacilitator
        // You'll have to make state variables in the slug and pass them down
        name={facilitators}
        bio={'bio'}
        facilitatorOpen={facilitatorOpen}
        handleClose={() => setFacilitatorOpen(false)}
      /> */}

    </Container>
  )
}