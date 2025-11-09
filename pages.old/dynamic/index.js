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
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdx from 'remark-mdx'
import { ErrorBoundary } from "react-error-boundary";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { sanitizeBeforeParse, dropLeadingSliceArtifacts, autoCloseInfoBlocks, autoCloseSecretBlocks, escapeCurlyForMDX } from '../../utils/sanitizer'
import remarkDeflist from 'remark-deflist'
import slicesUtil from '../../utils/slices.mjs'
const { maskBlocks, splitToSlices, mdxParseMaskedSliceOrThrow } = slicesUtil;

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
  const [initialLoading, setInitialLoading] = useState(true);
  const [debugSanitize, setDebugSanitize] = useState(false);
  const [debugPage, setDebugPage] = useState(null);

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

  // convert markdown to html and split into pages (mdast-based splitting)
  // returns { pages: ReactNodes[], titles: string[] }
  const convertContenttoHTML = function (content) {
    // Safeguard against null/undefined content
    if (!content) {
      return [];
    }

    try {
      // Split using mdast heading positions. Ignore headings whose start offsets fall inside
      // any <Secret>...</Secret> or <CodeEditor>...</CodeEditor> range in the original source.
      // Also: protect CodeEditor and Secret inner content from MDX escaping by masking/restoring.
      // (segments now provided by shared maskBlocks below)
      // Auto-close Secret blocks that are opened without a closer before a blank line, heading, new block, or EOF
      const autoCloseSecretBlocks = (str) => {
        const lines = str.split(/\r?\n/);
        let inFence = false;
        let openSince = -1;
        for (let i = 0; i < lines.length; i++) {
          let line = lines[i];
          if (!inFence && (line.startsWith('```') || line.startsWith('~~~'))) { inFence = true; continue; }
          if (inFence && (line.startsWith('```') || line.startsWith('~~~'))) { inFence = false; continue; }
          if (inFence) continue;
          // If we see a closer without opener, drop it
          if (/^\s*<\/\s*Secret\s*>\s*$/.test(line) && openSince === -1) { lines[i] = ''; continue; }
          // Opening Secret
          if (/<Secret\b[^>]*>/.test(line)) {
            if (/<\/\s*Secret\s*>/.test(line)) continue; // balanced on same line
            if (openSince === -1) openSince = i;
            continue;
          }
          // If currently open, decide if we should auto-close at boundary
          if (openSince !== -1) {
            const isHeading = /^\s*#{1,6}\s+/.test(line);
            const isTagStart = /^\s*<\s*[A-Za-z]/.test(line);
            // Do not close on blank lines; only at heading or new tag line
            if ((isHeading || isTagStart) && !/<\/\s*Secret\s*>/.test(line)) {
              let j = i - 1;
              while (j >= openSince && lines[j].trim() === '') j--;
              const at = j >= openSince ? j : openSince;
              lines[at] = (lines[at] || '') + '</Secret>';
              openSince = -1;
            }
          }
          // If a natural closer appears later, clear the open marker
          if (/<\/\s*Secret\s*>/.test(line)) openSince = -1;
        }
        if (openSince !== -1) {
          lines[lines.length - 1] = (lines[lines.length - 1] || '') + '</Secret>';
        }
        return lines.join('\n');
      };
      const maskBlocksLocal = (src) => {
        // Mask CodeEditor inner content, keep attributes and add data-index
        let masked = src.replace(/<CodeEditor\b([^>]*)>([\s\S]*?)<\/CodeEditor>/gi, (m, attrs, inner) => {
          const idx = codeEditorSegments.length;
          codeEditorSegments.push(inner);
          // Preserve attrs, add data-index if not present
          const hasData = /data-index\s*=/.test(attrs);
          const newAttrs = hasData ? attrs : `${attrs} data-index="${idx}"`;
          return `<CodeEditor${newAttrs}></CodeEditor>`;
        });
        // Mask Secret inner content similarly
        masked = masked.replace(/<Secret\b([^>]*)>([\s\S]*?)<\/Secret>/gi, (m, attrs, inner) => {
          const idx = secretSegments.length;
          secretSegments.push(inner);
          const hasData = /data-index\s*=/.test(attrs);
          const newAttrs = hasData ? attrs : `${attrs} data-index="${idx}"`;
          return `<Secret${newAttrs}></Secret>`;
        });
        // Do not mask Info; leave Info blocks intact for splitting
        return masked;
      };
      const restoreBlocksLocal = (src) => {
        let restored = src.replace(/<CodeEditor\b([^>]*)><\/CodeEditor>/gi, (m, attrs) => {
          const mIdx = /data-index\s*=\s*"?(\d+)"?/i.exec(attrs);
          const idx = mIdx ? parseInt(mIdx[1], 10) : -1;
          const inner = (idx >= 0 && codeEditorSegments[idx] != null) ? codeEditorSegments[idx] : '';
          return `<CodeEditor${attrs}>${inner}</CodeEditor>`;
        });
        restored = restored.replace(/<Secret\b([^>]*)><\/Secret>/gi, (m, attrs) => {
          const mIdx = /data-index\s*=\s*"?(\d+)"?/i.exec(attrs);
          const idx = mIdx ? parseInt(mIdx[1], 10) : -1;
          const inner = (idx >= 0 && secretSegments[idx] != null) ? secretSegments[idx] : '';
          return `<Secret${attrs}>${inner}</Secret>`;
        });
        // No Info placeholders to restore (Info left intact)
        return restored;
      };
      // Mask placeholders using shared utils to avoid MDX parsing inner CodeEditor/Secret/Info
      const preAuto = autoCloseSecretBlocks(autoCloseInfoBlocks(content));
      const { masked: maskedContent, codeEditorSegments, secretSegments, infoSegments, keywordSegments } = maskBlocks(preAuto);
      // General sanitize before parse
      const sanitizeSource = (str) => sanitizeBeforeParse(str);
      let maskedEscaped = escapeCurlyForMDX(maskedContent);
      maskedEscaped = sanitizeSource(maskedEscaped);
      // Split using shared utility for complete functional reuse
      const longPages = (currentFile?.data?.long_pages === true) || (currentFile?.data?.long_pages === 'true');
      const slicesArr = splitToSlices(maskedEscaped, { longPages });
      // helper to extract plain text from mdast subtree
      const mdText = (n) => {
        if (!n) return '';
        if (n.type === 'text') return n.value || '';
        if (Array.isArray(n.children)) return n.children.map(mdText).join('');
        return '';
      };
      if (slicesArr.length === 0) {
        const el = ConvertMarkdown({ content: maskedEscaped, segments: { codeEditorSegments, secretSegments, infoSegments, keywordSegments }, allUploads, workshopTitle, language, setCode, setEditorOpen, setAskToRun, gitUser, gitRepo, gitFile, instUser, instRepo, setJupyterSrc });
        return { pages: [<div key={`page-0`} className="page-content">{el}</div>], titles: [] };
      }
      // Titles: parse each slice's first heading
      const titles = slicesArr.map((slice, i) => {
        try {
          const t = unified().use(remarkParse).parse(slice);
          const first = (Array.isArray(t.children) ? t.children[0] : null);
          if (first && first.type === 'heading') return mdText(first).trim() || `Page ${i + 2}`;
        } catch {}
        return `Page ${i + 2}`;
      });
      const pagesOut = slicesArr.map((md, index) => {
        // OPTION B parity: validate MDX parse on masked content first (like test script)
        let maskedClean = dropLeadingSliceArtifacts(sanitizeSource(md));
        try {
          mdxParseMaskedSliceOrThrow(maskedClean);
        } catch (e) {
          throw e; // surface MDX errors matching test semantics
        }
        // Render masked slice directly; ConvertMarkdown will map placeholders using provided segments
        let cleaned = md;
        const slicePage = index + 2; // account for Frontmatter as page 1
        if (debugSanitize && (!debugPage || slicePage === debugPage)) {
          try {
            const preview = cleaned.split(/\r?\n/).slice(0, 60).join('\n');
            // eslint-disable-next-line no-console
            console.log(`SANITIZED SLICE [page ${slicePage}] preview:\n` + preview);
          } catch {}
        }
        return (
          <div key={`page-${index}`} className="page-content">
            {ConvertMarkdown({ content: cleaned, segments: { codeEditorSegments, secretSegments, infoSegments, keywordSegments }, allUploads, workshopTitle, language, setCode, setEditorOpen, setAskToRun, gitUser, gitRepo, gitFile, instUser, instRepo, setJupyterSrc })}
          </div>
        );
      });
      return { pages: pagesOut, titles };

    } catch (error) {
      console.error('Error converting markdown:', error);
      setMarkdownError(error);
      return { pages: [], titles: [] };
    }
  }

  const data = useWorkshop(gitUser, gitFile, builtURL, editing);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setGitFile(urlParams.get('file'));
    setEditing(urlParams.get('edit'));
    setDebugSanitize(urlParams.get('debugSanitize') === '1');
    const dbg = urlParams.get('debugPage');
    setDebugPage(dbg ? Number(dbg) : null);
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
      if (initialLoading) setInitialLoading(false);
    }
  }, [currentPage, pages])

  const [secondPageLink, setSecondPageLink] = useState('');
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('page', 2);
    setSecondPageLink(`${'./dynamic'}?${urlParams}`);
    if (currentFile != null && content !== '' && metadata != null) {
      const frontMatterContent = Frontmatter(currentFile, setCurrentPage, setCurrentContent, pages, instUser, instRepo, workshopTitle, pageTitles, currentPage, router, secondPageLink);
      const { pages: convPages, titles } = convertContenttoHTML(content);
      setPages([frontMatterContent, ...convPages]);
      // Pre-seed pageTitles from mdast titles to improve robustness
      const seeded = [{ title: 'Frontmatter', index: 1, active: currentPage === 1 }]
        .concat(titles.map((t, i) => ({ title: t, index: i + 2, active: currentPage === i + 2 })));
      setPageTitles(seeded);
      setCurrentContentLoaded(true);
      if (initialLoading) setInitialLoading(false);
    }
  }, [currentFile, content, metadata, currentPage, secondPageLink, allUploads])

  // list of page titles and highlight current page
  useEffect(() => {
    setTitle(workshopTitle);
    let mostRecentH1 = null;
    let mostRecentH1Index = null;

    const getText = (node) => {
      if (node == null) return '';
      if (typeof node === 'string') return node;
      if (Array.isArray(node)) return node.map(getText).join('');
      if (node.props && node.props.children !== undefined) return getText(node.props.children);
      return '';
    }

    const findFirstHeading = (node) => {
      if (!node) return null;
      if (Array.isArray(node)) {
        for (const n of node) {
          const found = findFirstHeading(n);
          if (found) return found;
        }
        return null;
      }
      if (typeof node === 'object' && node.type) {
        if (typeof node.type === 'string') {
          if (node.type === 'h1' || node.type === 'h2') return node;
          if (node.type === 'code' || node.type === 'pre') return null;
        }
        if (node.props && node.props.children !== undefined) {
          return findFirstHeading(node.props.children);
        }
      }
      return null;
    }

    const pageTitlesGet = pages.map((page, index) => {
      if (index === 0) {
        return {
          title: 'Frontmatter',
          index: index + 1,
          active: index + 1 === currentPage,
          parent: undefined,
          parentIndex: undefined,
        };
      }
      const child = page?.props?.children;
      const heading = findFirstHeading(child);
      const tag = heading?.type;
      // Prefer existing seeded title if available and heading missing
      let titleText = heading ? getText(heading.props?.children) : (pageTitles[index]?.title || `Page ${index + 1}`);
      let parent = undefined;
      let parentIndex = undefined;
      if (tag === 'h1') {
        mostRecentH1 = titleText;
        mostRecentH1Index = index;
      }
      if (tag === 'h2') {
        parent = mostRecentH1;
        parentIndex = mostRecentH1Index;
      }
      return {
        title: titleText,
        index: index + 1,
        active: index + 1 === currentPage,
        parent,
        parentIndex,
      };
    });

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
      <>
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
                  {currentContent ? (
                    <Fade in={true} timeout={500}>
                      <div className="page-content">{currentContent}</div>
                    </Fade>
                  ) : (

                    <div className='skeleton-container'
                      style={{
                        width: '100%',
                        minHeight: '80vh',
                        paddingTop: '12px'
                      }}
                    >
                      <Skeleton variant="rect" width={'80%'} height={32} sx={{ mb: 2 }} />
                      {Array(12).fill(0).map((_, i) => (
                        <Skeleton key={`t-${i}`} variant="text" height={28} width={`${95 - i * 2}%`} />
                      ))}
                      <Skeleton variant="rect" width={'100%'} height={220} sx={{ my: 2 }} />
                      {Array(10).fill(0).map((_, i) => (
                        <Skeleton key={`m-${i}`} variant="text" height={26} width={`${92 - i * 3}%`} />
                      ))}
                      <Skeleton variant="rect" width={'100%'} height={280} sx={{ my: 2 }} />
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
      
      </>
    </ErrorBoundary>
  )
}
