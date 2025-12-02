'use client'
import Head from 'next/head'
import Header from '../../components/Header'
import matter from 'gray-matter'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import DirectiveMarkdown from '../../components/WorkshopPieces/DirectiveMarkdown'
import Frontmatter from '../../components/WorkshopPieces/Frontmatter'
import WorkshopHeader from '../../components/WorkshopPieces/WorkshopHeader'
import Footer from '../../components/Footer'
import Container from '@mui/material/Container'
import Skeleton from '@mui/material/Skeleton'
import DrawerEditorMovable from '../../components/Editor/DrawerEditor'
import { styled } from '@mui/material/styles'
import useUploads from '../../components/Hooks/UseUploads'
import useWorkshop from '../../components/Hooks/UseWorkshop'
import Pagination from '../../components/WorkshopPieces/Pagination'
import { Fade } from '@mui/material'
import { ErrorBoundary } from 'react-error-boundary'
import { Alert, AlertTitle } from '@mui/material'
import { unified } from 'unified'
import remarkParse from 'remark-parse'

const drawerWidth = '-30%'

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
)

/**
 * Split markdown content by headings (H1 and H2)
 * Returns array of content slices and their titles
 */
function splitByHeadings(content, longPages = false) {
  const tree = unified().use(remarkParse).parse(content)
  const slices = []
  const titles = []

  // Find heading positions
  const headingTypes = longPages ? ['heading'] : ['heading']
  const headingDepths = longPages ? [1] : [1, 2]

  const headings = tree.children.filter(
    node => node.type === 'heading' && headingDepths.includes(node.depth)
  )

  if (headings.length === 0) {
    return { slices: [content], titles: ['Content'] }
  }

  // Extract slices based on heading positions
  let lastEnd = 0
  for (const heading of headings) {
    const start = heading.position.start.offset
    const title = heading.children
      .filter(c => c.type === 'text')
      .map(c => c.value)
      .join('')

    if (start > lastEnd) {
      // There's content before this heading
      const slice = content.slice(lastEnd, start).trim()
      if (slice && slices.length === 0) {
        slices.push(slice)
        titles.push('Introduction')
      }
    }

    // Find the end of this section (start of next heading or end of content)
    const headingIndex = headings.indexOf(heading)
    const nextHeading = headings[headingIndex + 1]
    const end = nextHeading ? nextHeading.position.start.offset : content.length

    slices.push(content.slice(start, end).trim())
    titles.push(title || `Section ${slices.length}`)
    lastEnd = end
  }

  return { slices, titles }
}

export default function WorkshopPageV2({
  title,
  setTitle,
  ...props
}) {
  const [content, setContent] = useState('')
  const [currentFile, setCurrentFile] = useState(null)
  const [currentContent, setCurrentContent] = useState(null)
  const [language, setLanguage] = useState('')
  const [pageTitles, setPageTitles] = useState([])
  const [editorOpen, setEditorOpen] = useState(false)
  const [workshopTitle, setWorkshopTitle] = useState('')
  const [code, setCode] = useState(null)
  const [askToRun, setAskToRun] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [pages, setPages] = useState([])
  const [initialLoading, setInitialLoading] = useState(true)
  const [markdownError, setMarkdownError] = useState(null)
  const [jupyterSrc, setJupyterSrc] = useState('https://dhri-curriculum.github.io/jupyterlite/lab/index.html')
  const [allUploads, setAllUploads] = useState(null)
  const [uploadsURL, setUploadsURL] = useState(null)
  const [builtURL, setBuiltURL] = useState(null)
  const [gitFile, setGitFile] = useState(null)
  const [gitBranch, setGitBranch] = useState('v2') // Default to v2 branch

  const gitUser = props.gitUser
  const gitRepo = props.gitRepo
  const instUser = props.instGitUser
  const instRepo = props.instGitRepo

  const router = useRouter()

  const uploads = useUploads({
    setAllUploads, allUploads, gitUser, gitRepo, gitFile,
    uploadsURL, setUploadsURL, ...props
  })

  // Fetch workshop data
  const data = useWorkshop(gitUser, gitFile, builtURL, false)

  // Parse URL parameters and build fetch URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const file = urlParams.get('file')
    const branch = urlParams.get('branch') || 'v2'
    const page = Number(urlParams.get('page')) || 1

    setGitFile(file)
    setGitBranch(branch)
    setCurrentPage(page)

    if (urlParams.get('sidebar')) {
      setLanguage(urlParams.get('sidebar'))
    }

    if (file) {
      // Build URL with branch parameter for GitHub API
      const url = `https://api.github.com/repos/${gitUser}/${gitRepo}/contents/${file}.md?ref=${branch}`
      setBuiltURL(url)
    }
  }, [gitUser, gitRepo])

  // Parse fetched data
  useEffect(() => {
    if (data && !currentFile && typeof data === 'string') {
      try {
        const matterResult = matter(data)
        setCurrentFile(matterResult)
        setWorkshopTitle(matterResult.data.title)
        setContent(matterResult.content)

        const urlParams = new URLSearchParams(window.location.search)
        if (!urlParams.get('sidebar')) {
          setLanguage(matterResult.data.programming_language)
        }
      } catch (err) {
        console.error('Error parsing markdown:', err)
        setMarkdownError(err)
      }
    }
  }, [data])

  // Build pages from content
  useEffect(() => {
    if (currentFile && content) {
      try {
        const longPages = currentFile.data.long_pages === true
        const { slices, titles } = splitByHeadings(content, longPages)

        // Convert slices to React components using DirectiveMarkdown
        const renderedPages = slices.map((slice, index) => (
          <DirectiveMarkdown
            key={index}
            content={slice}
            allUploads={allUploads}
            setCode={setCode}
            setEditorOpen={setEditorOpen}
            setAskToRun={setAskToRun}
            setJupyterSrc={setJupyterSrc}
            gitUser={gitUser}
            gitRepo={gitRepo}
            gitFile={gitFile}
            instUser={instUser}
            instRepo={instRepo}
          />
        ))

        // Build frontmatter page
        const secondPageLink = `./v2?user=${gitUser}&repo=${gitRepo}&file=${gitFile}&branch=${gitBranch}&page=2${
          instUser && instRepo ? `&instUser=${instUser}&instRepo=${instRepo}` : ''
        }`

        const frontmatterPage = Frontmatter(
          currentFile,
          setCurrentPage,
          setCurrentContent,
          renderedPages,
          instUser,
          instRepo,
          workshopTitle,
          pageTitles,
          currentPage,
          router,
          secondPageLink
        )

        // Combine frontmatter + content pages
        const allPages = [frontmatterPage, ...renderedPages]
        setPages(allPages)

        // Set page titles
        const allTitles = [
          { title: 'Frontmatter', index: 1, active: currentPage === 1 },
          ...titles.map((t, i) => ({
            title: t,
            index: i + 2,
            active: currentPage === i + 2,
          })),
        ]
        setPageTitles(allTitles)
        setInitialLoading(false)
      } catch (err) {
        console.error('Error building pages:', err)
        setMarkdownError(err)
      }
    }
  }, [currentFile, content, allUploads, currentPage])

  // Update current content when page changes
  useEffect(() => {
    if (pages.length > 0 && currentPage > 0) {
      setCurrentContent(pages[currentPage - 1])
    }
  }, [currentPage, pages])

  // Update page titles active state
  useEffect(() => {
    setTitle(workshopTitle)
    setPageTitles(prev => prev.map(p => ({
      ...p,
      active: p.index === currentPage,
    })))
  }, [currentPage, workshopTitle])

  // Set workshop mode based on current page
  useEffect(() => {
    if (currentPage === 1 || currentPage === 0) {
      props.setWorkshopMode(false)
    } else {
      props.setWorkshopMode(true)
    }
  }, [currentPage])

  // Handle page navigation
  const handlePageChange = (event, value) => {
    const valueAsNumber = Number(value)
    const urlParams = new URLSearchParams(window.location.search)
    urlParams.set('page', valueAsNumber)
    window.history.pushState({}, '', `?${urlParams}`)
    setCurrentPage(valueAsNumber)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Handle browser back/forward
  useEffect(() => {
    window.onpopstate = () => {
      const urlParams = new URLSearchParams(window.location.search)
      const page = Number(urlParams.get('page')) || 1
      setCurrentPage(page)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [pages])

  function ErrorFallback({ error }) {
    return (
      <div role="alert">
        <p>Something went wrong:</p>
        <pre style={{ color: 'red' }}>{error.message}</pre>
      </div>
    )
  }

  if (markdownError) {
    return (
      <div style={{ color: 'red', fontSize: '20px', textAlign: 'center', marginTop: '20px' }}>
        There was an error loading the workshop.
        <div>{markdownError.message}</div>
      </div>
    )
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {props.workshopMode && workshopTitle ? (
          <WorkshopHeader
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            setCurrentContent={setCurrentContent}
            pages={pages}
            pageTitles={pageTitles}
            workshopTitle={workshopTitle}
            handlePageChange={handlePageChange}
            instUser={instUser}
            instRepo={instRepo}
          />
        ) : (
          <Header
            title={workshopTitle}
            instUser={instUser}
            instRepo={instRepo}
            gitUser={gitUser}
            gitRepo={gitRepo}
          />
        )}

        <Container
          disableGutters
          maxWidth={props.workshopMode ? 'md' : '100%'}
          sx={{
            paddingLeft: { md: '80px' },
            ...(props.workshopMode && { marginLeft: { md: '100px' } }),
            flexGrow: 1,
          }}
        >
          <Head>
            <title>{title}</title>
          </Head>
          <Main open={editorOpen} id="main" style={{ paddingLeft: '0px' }}>
            <div className="card-page">
              <div className="workshop-container">
                {currentContent ? (
                  <Fade in timeout={500}>
                    <div className="page-content">{currentContent}</div>
                  </Fade>
                ) : (
                  <div className="skeleton-container" style={{ width: '100%', minHeight: '80vh', paddingTop: '12px' }}>
                    <Skeleton variant="rectangular" width="80%" height={32} sx={{ mb: 2 }} />
                    {Array(12).fill(0).map((_, i) => (
                      <Skeleton key={i} variant="text" height={28} width={`${95 - i * 2}%`} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Main>

          {language && props.workshopMode && (
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
            />
          )}
        </Container>

        {props.workshopMode && (
          <div className="workshop-footer">
            <Pagination
              currentPage={currentPage}
              pageTitles={pageTitles}
              handlePageChange={handlePageChange}
              pages={pages}
              editorOpen={editorOpen}
            />
            <Footer workshopMode={props.workshopMode} />
          </div>
        )}
      </div>
    </ErrorBoundary>
  )
}
