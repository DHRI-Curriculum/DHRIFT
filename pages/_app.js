import { useEffect, useState, useRef } from 'react';
import Head from 'next/head';
import Script from 'next/script';

// MUI base
import CssBaseline from '@mui/material/CssBaseline';
import { StyledEngineProvider } from '@mui/material/styles';

// External styles
import 'highlight.js/styles/obsidian.css';
import 'allotment/dist/style.css';
import 'react-medium-image-zoom/dist/styles.css';

// Global styles last to override
import '../styles/styles.scss';

// Framework imports
import dynamic from 'next/dynamic';
import { ThemeProvider } from 'next-themes';
import { SWRConfig, useSWRConfig } from 'swr';
import { useRouter } from 'next/router';
import { GitHubProvider } from '../components/GitHubContext';
import PyodideProvider from '../components/Wasm/PyodideProvider';

const Footer = dynamic(() => import('../components/Footer'));

function MyApp({ Component, pageProps }) {
  const [title, setTitle] = useState('');
  const [workshopMode, setWorkshopMode] = useState(false);
  const [gitUser, setGitUser] = useState(null);
  const [gitRepo, setGitRepo] = useState(null);
  const [instGitUser, setInstGitUser] = useState(null);
  const [instGitRepo, setInstGitRepo] = useState(null);
  const [query, setQuery] = useState(null);
  const [cacheCleared, setCacheCleared] = useState(false);
  const { cache, mutate } = useSWRConfig();
  const router = useRouter();

  const swrCacheProvider = useRef(new Map()).current;
  const clearCache = () => {
    cache.clear();
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setQuery(urlParams);
    setInstGitUser(urlParams.get('instUser'));
    setInstGitRepo(urlParams.get('instRepo'));
    if (router.pathname === '/inst' && urlParams.get('user') && urlParams.get('repo')) {
      router.push('/inst?instUser=' + urlParams.get('user') + '&instRepo=' + urlParams.get('repo'))
    }
    if (urlParams.get('user') && urlParams.get('repo')) {
      setGitUser(urlParams.get('user'));
      setGitRepo(urlParams.get('repo'));
    } 
    // else {
    //   console.error('GitHub user or repository is not specified in the URL.');
    // }
    if (urlParams.get('edit') === 'true') {
      if (cacheCleared == false) {
        localStorage.removeItem('app-cache');
        localStorage.removeItem('app-cache-time');
        clearCache()
        setCacheCleared(true)
        console.log('cache cleared')
      }
    }
  }, [router])

  pageProps = {
    ...pageProps,
    query,
    title,
    setTitle,
    workshopMode,
    setWorkshopMode,
    gitUser,
    setGitUser,
    gitRepo,
    setGitRepo, 
    instGitUser,
    setInstGitUser,
    instGitRepo,
    setInstGitRepo,
    clearCache
  };

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      {process.env.NODE_ENV === 'development' && (
        <Script src="https://unpkg.com/react-grab/dist/index.global.js" strategy="afterInteractive" />
      )}
      <StyledEngineProvider injectFirst>
        <CssBaseline />
        <ThemeProvider>
          <main className='container'>
            <SWRConfig value={{ provider: () => swrCacheProvider }}>
              <GitHubProvider>
                <PyodideProvider>
                  <Component {...pageProps} />
                </PyodideProvider>
              </GitHubProvider>
            </SWRConfig>
          </main>
        </ThemeProvider>
        {!workshopMode && <Footer />}
      </StyledEngineProvider>
    </>
  );
}

export default MyApp;
