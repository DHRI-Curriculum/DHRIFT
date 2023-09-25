'use client'
import Head from 'next/head'
import matter from 'gray-matter'
import { useEffect, useState, Fragment } from 'react'
import ConvertMarkdown from '../../components/WorkshopPieces/ConvertMarkdown'
import Sidebar from '../../components/WorkshopPieces/Sidebar'
import Frontmatter from '../../components/WorkshopPieces/Frontmatter';
import WorkshopHeader from '../../components/WorkshopPieces/WorkshopHeader'
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Skeleton from '@mui/material/Skeleton';
import DrawerEditor from '../../components/Editor/DrawerEditor'
import { styled, useTheme } from '@mui/material/styles';
import useUploads from '../../components/Hooks/UseUploads';
import useWorkshop from '../../components/Hooks/UseWorkshop'

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
  authors,
  title,
  setTitle,
  ...props
}) {

  const [content, setContent] = useState('');
  const [currentFile, setCurrentFile] = useState(null);
  const [currentContent, setCurrentContent] = useState([]);
  const [language, setLanguage] = useState('');
  const [currentContentLoaded, setCurrentContentLoaded] = useState(false);
  const [pageTitles, setPageTitles] = useState([]);
  const [currentHeader, setCurrentHeader] = useState(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [workshopTitle, setWorkshopTitle] = useState('');
  const [code, setCode] = useState(null);
  // communicates with the editor to run code
  const [askToRun, setAskToRun] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState([]);
  const [gitUser, setGitUser] = useState(null);
  const [gitRepo, setGitRepo] = useState(null);
  const [gitFile, setGitFile] = useState(null);
  const [instUser, setInstUser] = useState(null);
  const [instRepo, setInstRepo] = useState(null);
  const [builtURL, setBuiltURL] = useState(null);
  const [editing, setEditing] = useState(false);

  const [allUploads, setAllUploads] = useState([]);
  const uploads = useUploads(allUploads, setAllUploads, gitUser, gitRepo);

  // convert markdown to html and split into pages
  const convertContenttoHTML = function (content) {
    const htmlifiedContent = ConvertMarkdown(content, uploads, workshopTitle, language, setCode, setEditorOpen, setAskToRun, gitUser, gitRepo, gitFile);
    // split react element array into pages
    const allPages = [];
    const pages = htmlifiedContent?.props.children.reduce((acc, curr) => {
      // allPages = [[h1, p, p][h1, p, div]]
      if (typeof curr === 'string') {
        return acc;
      } else if (curr.type === 'h1') {
        allPages.push([curr]);
        // this changes from long pages to short ones 
      } else if (curr.type === 'h2') {
        allPages.push([curr]);
      } else {
        allPages[allPages.length - 1].push(curr);
      }
      return acc;
    }, []);

    return (
      allPages.map((page, index) => {  // page = [h1, p, p]
        return (
          <div key={index} className='page-content'>
            {page.map((element, index) => {
              return (
                <Fragment key={index}>
                  {element}
                </Fragment>
              )
            }
            )}
          </div>
        )
      }
      )
    )
  }

  const data = useWorkshop(gitUser, builtURL, editing);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setGitUser(urlParams.get('user'));
    setGitRepo(urlParams.get('repo'));
    setGitFile(urlParams.get('file'));
    setEditing(urlParams.get('edit'));
    setInstUser(urlParams.get('instUser'));
    setInstRepo(urlParams.get('instRepo'));
    if (gitFile === null) {
      setBuiltURL(`https://api.github.com/repos/${gitUser}/${gitRepo}/contents/${gitRepo}.md`)
    }
    else {
      setBuiltURL(`https://api.github.com/repos/${gitUser}/${gitRepo}/contents/${gitFile}.md`)
    }
  }, [gitUser, gitRepo, gitFile, editing, instUser, instRepo])

  useEffect(() => {
    if (data && !currentFile && typeof (data) === 'string') {
      const matterResult = matter(data)
      setCurrentFile(matterResult)
      setContent(matterResult.content)
      setLanguage(matterResult.data.programming_language);
      setWorkshopTitle(matterResult.data.title);
    }
  }, [data])

  useEffect(() => {
    if (currentFile != null && content != '') {
      const frontPageContent = Frontmatter(currentFile, setCurrentPage, setCurrentContent,
        pages, instUser, instRepo, workshopTitle, pageTitles, currentPage);
      setPages([frontPageContent, ...convertContenttoHTML(content)]);
    }
  }, [currentFile, content])

  // list of page titles and highlight current page
  useEffect(() => {
    setTitle(workshopTitle);
    let mostRecentH1 = null;
    const pageTitlesGet = pages.map((page, index) => {
      let header = undefined;
      // if it's the frontpage vs not
      index === 0 ? header = "Frontmatter" : header = page.props.children[0].props.children.props.children[0]
      if (typeof header === 'object') {
        header = header.props.children;
      }
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
  }, [currentPage, pages]);

  useEffect(() => {
    // setCurrentPage(1);
    const urlParams = new URLSearchParams(window.location.search);
    const page = Number(urlParams.get('page'));
    if (page) {
      setCurrentPage((page));
      setCurrentContent(pages[page - 1]);
      setCurrentContentLoaded(true);
    } else {
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

  useEffect(() => {
    // This is for the frontmatter 'Get Started' button
    if (currentPage === 2) {
      setCurrentContent(pages[1]);
    }
  }, [currentPage])

  const PaginationComponent = (currentPage) => {
    const sectionTitle = function () {
      let theMostRecentH1 = null;
      if (pageTitles[currentPage - 2]?.parent) {
        theMostRecentH1 = pageTitles[currentPage - 2]?.parent;
      } else {
        theMostRecentH1 = pageTitles[currentPage + 1]?.parent;
      }
      return theMostRecentH1;
    }
    const goBackString = function () {
      if (sectionTitle() !== pageTitles[currentPage - 2]?.title) {

        return (
          <>
            {sectionTitle()}: <p>{pageTitles[currentPage - 2]?.title}</p>
          </>
        )
      } else {
        return (
          <>
            {pageTitles[currentPage - 2]?.title}
          </>
        )
      }
    }
    const nextH1 = pageTitles[currentPage]?.parent ? pageTitles[currentPage]?.parent : pageTitles[currentPage]?.title;
    const goForwardString = function () {
      if (nextH1 !== pageTitles[currentPage]?.title) {
        return (
          <>
            {nextH1}: <p>{pageTitles[currentPage]?.title}</p>
          </>
        )
      } else {
        return (
          <>
            {pageTitles[currentPage]?.title}
          </>
        )
      }
    }

    return (
      <div className='pagination'>
        <Button
          className='pagination-button'
          onClick={() => handlePageChange(event, Number(currentPage) - 1)}
          disabled={currentPage === 1}
        >
          <ArrowBackIcon />
          {currentPage === 1 ? 'Frontmatter' : goBackString()}
        </Button>
        <Button
          className='pagination-button'
          onClick={() => handlePageChange(event, Number(currentPage) + 1)}
          disabled={currentPage === pages.length}
          sx={{
            justifySelf: 'flex-end',
          }}
        >
          {currentPage === pages.length ? 'Frontmatter' : goForwardString()}
          <ArrowForwardIcon />
        </Button>
      </div>
    )
  }

  useEffect(() => {
    if (currentPage === 1) {
      props.setWorkshopHeader(false);
    }
    else {
      props.setWorkshopHeader(true);
    }
  }, [currentPage])


  const handlePageChange = (event, value) => {
    // scroll smoothly to top of page
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    const valueAsNumber = Number(value);
    // CHANGE THIS
    // router.push(`/dynamic/${slug[0]}/${slug[1]}/${slug[2]}/?page=${valueAsNumber}`, undefined, { shallow: true, scroll: false });
    setCurrentPage(valueAsNumber);
    setCurrentContent(pages[valueAsNumber - 1]);
  }

  // if (isLoading) return <div>Loading...</div>
  return (
    <Fragment>
      {props.workshopHeader && workshopTitle != undefined && <WorkshopHeader currentPage={currentPage}
        setCurrentPage={setCurrentPage} setCurrentContent={setCurrentContent}
        pages={pages} pageTitles={pageTitles} workshopTitle={workshopTitle}
        handlePageChange={handlePageChange} instUser={instUser} instRepo={instRepo}
      />}
      <Container
        disableGutters={true}
        maxWidth={'md'}
        sx={{
          display: 'flex',
          marginLeft: {
            md: '100px',
          },
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Head>
          <title>{title}</title>
        </Head>
        <Main open={editorOpen}
          sx={{
            padding: '0px',
          }}
        >
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
      {PaginationComponent(currentPage)}
    </Fragment>
  )
}