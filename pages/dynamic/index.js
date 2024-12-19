'use client'
import Head from 'next/head'
import Header from '../../components/Header'
import matter from 'gray-matter'
import { useEffect, useState, Fragment } from 'react'
import { useRouter } from 'next/router'
import ConvertMarkdown from '../../components/WorkshopPieces/ConvertMarkdown'
import Frontmatter from '../../components/WorkshopPieces/Frontmatter';
import WorkshopHeader from '../../components/WorkshopPieces/WorkshopHeader'
import Footer from '../../components/Footer'
import Container from '@mui/material/Container';
import Skeleton from '@mui/material/Skeleton';
import DrawerEditorMovable from '../../components/Editor/DrawerEditor'
import { styled } from '@mui/material/styles';
import useUploads from '../../components/Hooks/UseUploads';
import useWorkshop from '../../components/Hooks/UseWorkshop';
import Pagination from '../../components/WorkshopPieces/Pagination';
import { Fade } from '@mui/material'
import { ErrorBoundary } from "react-error-boundary";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

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
  props.content = content;
  const [metadata, setMetadata] = useState(null);
  props.metadata = metadata;
  const [currentFile, setCurrentFile] = useState(null);
  const [currentContent, setCurrentContent] = useState([]);
  const [language, setLanguage] = useState('');
  const [currentContentLoaded, setCurrentContentLoaded] = useState(false);
  const [pageTitles, setPageTitles] = useState([]);
  const [currentHeader, setCurrentHeader] = useState(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [workshopTitle, setWorkshopTitle] = useState('');
  const [code, setCode] = useState(null);
  const [askToRun, setAskToRun] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState([]);

  const gitUser = props.gitUser
  const setGitUser = props.setGitUser
  const gitRepo = props.gitRepo
  const setGitRepo = props.setGitRepo
  const instUser = props.instGitUser
  const setInstUser = props.setInstGitUser
  const instRepo = props.instGitRepo
  const setInstRepo = props.setInstGitRepo

  const [gitFile, setGitFile] = useState(null);
  const [builtURL, setBuiltURL] = useState(null);
  const [editing, setEditing] = useState(false);
  const [markdownError, setMarkdownError] = useState(false);
  const [jupyterSrc, setJupyterSrc] = useState('https://dhri-curriculum.github.io/jupyterlite/lab/index.html');

  const [allUploads, setAllUploads] = useState(null);
  const [uploadsURL, setUploadsURL] = useState(null);

  const uploads = useUploads({ setAllUploads, allUploads, gitUser, gitRepo, gitFile, uploadsURL, setUploadsURL, ...props });

  const router = useRouter();

  // convert markdown to html and split into pages
  const convertContenttoHTML = function (content) {
    // Safeguard against null/undefined content
    if (!content) {
      return [];
    }

    try {
      const htmlifiedContent = ConvertMarkdown({ 
        content, 
        allUploads, 
        workshopTitle, 
        language, 
        setCode, 
        setEditorOpen, 
        setAskToRun, 
        gitUser, 
        gitRepo, 
        gitFile, 
        instUser, 
        instRepo, 
        setJupyterSrc 
      });

      // Safeguard against missing props or children
      if (!htmlifiedContent?.props?.children) {
        return [];
      }

      const allPages = [];
      const pages = htmlifiedContent.props.children.reduce((acc, curr) => {
        // Skip non-element nodes
        if (!curr || typeof curr !== 'object') {
          return acc; 
        }

        // Handle various heading levels
        if (curr.type === 'h1') {
          allPages.push([curr]);
        } else if (curr.type === 'h2' && currentFile?.data?.long_pages === 'false') {
          allPages.push([curr]);
        } else if (curr.type === 'h2' && !currentFile?.data?.long_pages) {
          allPages.push([curr]); 
        } else if (allPages.length > 0) {
          // Add content to current section if it exists
          allPages[allPages.length - 1].push(curr);
        } else {
          // Create new section if none exists
          allPages.push([curr]);
        }

        return acc;
      }, []);

      return allPages.map((page, index) => (
        <div key={`page-${index}`} className="page-content">
          {page.map((element, elementIndex) => (
            <div key={`element-${elementIndex}`}>
              {element} 
            </div>
          ))}
        </div>
      ));

    } catch (error) {
      console.error('Error converting markdown:', error);
      setMarkdownError(error);
      return [];
    }
  }

  const data = useWorkshop(gitUser, gitFile, builtURL, editing);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setGitFile(urlParams.get('file'));
    setEditing(urlParams.get('edit'));
    if (urlParams.get('sidebar')) {
      setLanguage(urlParams.get('sidebar'));
    }
    setCurrentPage(Number(urlParams.get('page')));
    if (gitFile === null) {
      setBuiltURL(`https://api.github.com/repos/${gitUser}/${gitRepo}/contents/${gitRepo}.md`)
    }
    else {
      setBuiltURL(`https://api.github.com/repos/${gitUser}/${gitRepo}/contents/${gitFile}.md`)
    }
  }, [gitUser, gitRepo, gitFile, editing, instUser, instRepo])

  useEffect(() => {
    if (data && !currentFile && typeof (data) === 'string') {
      try {
        const matterResult = matter(data)
        setCurrentFile(matterResult)
        setMetadata(matterResult.data)
        const urlParams = new URLSearchParams(window.location.search); //override sidebar language if it exists
        if (!urlParams.get('sidebar')) {
          setLanguage(matterResult.data.programming_language);
        }
        setWorkshopTitle(matterResult.data.title);
        setContent(matterResult.content)
      }
      catch (err) {
        console.log('err', err)
        console.log('data', data)
        setMarkdownError(err);
      }
    }
  }, [data])

  useEffect(() => {
    if (currentPage && pages.length > 0) {
      setCurrentContent(pages[currentPage - 1]);
    }
  }, [currentPage, pages])

  const [secondPageLink, setSecondPageLink] = useState('');
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('page', 2);
    setSecondPageLink(`${'./dynamic'}?${urlParams}`);
    if (currentFile != null && content != '' && metadata != null && allUploads != undefined) {
      const frontMatterContent = Frontmatter(currentFile, setCurrentPage, setCurrentContent, pages, instUser, instRepo, workshopTitle, pageTitles, currentPage, router, secondPageLink);
      setPages([frontMatterContent, ...convertContenttoHTML(content)]);
      setCurrentContentLoaded(true);
    }
  }, [currentFile, content, metadata, currentPage, secondPageLink, allUploads])

  // list of page titles and highlight current page
  useEffect(() => {
    setTitle(workshopTitle);
    let mostRecentH1 = null;
    let mostRecentH1Index = null;
    const pageTitlesGet = pages.map((page, index) => {
      let header = undefined;
      // if it's the frontpage vs not
      index === 0 ? header = "Frontmatter" : header = page.props.children[0].props.children.props.children[0]
      if (typeof header === 'object') {
        header = header.props.children;
      }
      let tag = page.props.children[0].props.children.type;
      let parent = undefined;
      let parentIndex = undefined;
      if (tag === 'h1') {
        mostRecentH1 = header;
        mostRecentH1Index = index;
      }
      if (tag === 'h2') {
        parent = mostRecentH1;
        parentIndex = mostRecentH1Index;
      }
      header = {
        title: header,
        index: index + 1,
        active: index + 1 === currentPage ? true : false,
        parent: parent,
        parentIndex: parentIndex,
      }
      return (header)
    })
    setPageTitles(pageTitlesGet)
  }, [currentPage, pages]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const page = Number(urlParams.get('page'));
    if (page) {
      setCurrentPage((page));
      setCurrentContent(pages[page - 1]);
      setCurrentContentLoaded(true);
    } else {
      setCurrentContent(pages[0]);
      setCurrentPage(1);
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


  useEffect(() => {
    if (currentPage === 1 || currentPage === 0) {
      props.setWorkshopMode(false);
    }
    else {
      props.setWorkshopMode(true);
    }
  }, [currentPage])

  useEffect(() => {
    if (metadata) {
      if (metadata?.uploads_dir) {
        setUploadsURL(`https://api.github.com/repos/${gitUser}/${gitRepo}/contents/${metadata.uploads_dir}`);
      } else {
        setUploadsURL(`https://api.github.com/repos/${gitUser}/${gitRepo}/contents/uploads/${gitFile}`);
      }
    }

  }, [metadata])


  const handlePageChange = (event, value) => {
    // scroll smoothly to top of page
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    const valueAsNumber = Number(value);
    router.push(`/dynamic/?user=${gitUser}&repo=${gitRepo}&file=${gitFile}&page=${valueAsNumber}&instUser=${instUser}&instRepo=${instRepo}`, undefined, { shallow: false, scroll: false });
    setCurrentPage(valueAsNumber);
    setCurrentContent(pages[valueAsNumber - 1]);
  }

  useEffect(() => {
    window.onpopstate = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const page = Number(urlParams.get('page'));
      if (page) {
        setCurrentPage((page));
        setCurrentContent(pages[page - 1]);
        setCurrentContentLoaded(true);
      } else {
        setCurrentContent(pages[0]);
        setCurrentPage(1);
      }
      // scroll to top 
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  })

  if (markdownError) return (
    <>
      <div
        style={{
          color: 'red',
          fontSize: '20px',
          textAlign: 'center',
          marginTop: '20px',
          marginBottom: '20px',
          fontWeight: 'bold'
        }}
      >There was an error loading the markdown file. Please check the file and try again.
        <div>{markdownError.message}</div>
      </div>
    </>)

  function ErrorFallback({ error }) {
    return (
      <div role="alert">
        <p>Something went wrong:</p>
        <pre style={{ color: 'red' }}>{error.message}</pre>
      </div>
    )
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Fade in={currentContentLoaded} timeout={500}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
          }}
        >
          {props.workshopMode && workshopTitle != undefined && <WorkshopHeader currentPage={currentPage}
            setCurrentPage={setCurrentPage} setCurrentContent={setCurrentContent}
            pages={pages} pageTitles={pageTitles} workshopTitle={workshopTitle}
            handlePageChange={handlePageChange} instUser={instUser} instRepo={instRepo}
          />
            ||
            <Header title={workshopTitle} instUser={instUser} instRepo={instRepo}
              gitUser={gitUser} gitRepo={gitRepo}
            />
          }

          <Container
            disableGutters={true}
            maxWidth={
              props.workshopMode ? 'md' : '100%'
            }
            sx={{
              paddingLeft: {
                md: '80px',
              },
              ...(props.workshopMode && {
                marginLeft: {
                  md: '100px',
                },
              }),
              flexGrow: 1,
            }}
          >
            <Head>
              <title>{title}</title>
            </Head>
            <Main open={editorOpen}
              id='main'
              style={{
                paddingLeft: '0px',
                paddingRight: {
                  sm: '0px',
                  xs: '0px',
                }
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
                  {markdownError && (
                    <div className="markdown-error">
                      <Alert severity="error">
                        <AlertTitle>Error Converting Markdown</AlertTitle>
                        {markdownError.message}
                      </Alert>
                    </div>
                  )}
                </div>
              </div>
            </Main>
            {language && props.workshopMode &&
              <DrawerEditorMovable
                drawerWidth={drawerWidth}
                open={editorOpen}
                setEditorOpen={setEditorOpen}
                text={code}
                setText={setCode}
                askToRun={askToRun}
                setAskToRun={setAskToRun}
                language={language}
                allUploads={uploads}
                gitUser={gitUser}
                gitRepo={gitRepo}
                jupyterSrc={jupyterSrc}
                setJupyterSrc={setJupyterSrc}
              />}
            {/* {props.workshopMode && <Pagination currentPage={currentPage} pageTitles={pageTitles} handlePageChange={handlePageChange} pages={pages} />} */}
          </Container>
          {props.workshopMode &&
            <>
              <div className='workshop-footer'>
                <Pagination
                  currentPage={currentPage}
                  pageTitles={pageTitles}
                  handlePageChange={handlePageChange}
                  pages={pages}
                  editorOpen={editorOpen}
                // sx={{
                //   backgroundColor: 'white',
                //   width: {  md:!editorOpen ? '100%' : '10%' },
                // }}
                />
                <Footer workshopMode={props.workshopMode} />
              </div>
            </>
          }
        </div>
      </Fade>
    </ErrorBoundary>
  )
}