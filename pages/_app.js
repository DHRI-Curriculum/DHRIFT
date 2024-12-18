import { useEffect, useState, useRef } from 'react';
import Head from 'next/head';
// MUI styles first
import CssBaseline from '@mui/material/CssBaseline';
import { StyledEngineProvider } from '@mui/material/styles';

// Framework imports
import dynamic from 'next/dynamic';
import { ThemeProvider } from 'next-themes';
import { SWRConfig, useSWRConfig } from 'swr';
import { useRouter } from 'next/router';
import { GitHubProvider } from '../components/GitHubContext';

// Custom styles after MUI
import 'allotment/dist/style.css';
import '../node_modules/highlight.js/styles/obsidian.css';
import '../styles/styles.scss';

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
      <StyledEngineProvider injectFirst>
        <CssBaseline />
        <ThemeProvider>
          <main className='container'>
            <SWRConfig value={{ provider: () => swrCacheProvider }}>
              <GitHubProvider>
                <Component {...pageProps} />
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
