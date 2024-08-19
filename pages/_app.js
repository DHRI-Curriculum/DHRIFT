import Header from '../components/Header';
import { StyledEngineProvider } from '@mui/material/styles';
import '../styles/styles.scss';
import '../node_modules/highlight.js/styles/obsidian.css';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import CssBaseline from '@mui/material/CssBaseline';
import dynamic from 'next/dynamic';
import { ThemeProvider } from 'next-themes';
const Footer = dynamic(() => import('../components/Footer'))
import PyodideProvider from '../components/Wasm/PyodideProvider';
import { SWRConfig } from 'swr';
import { useRef } from 'react';
import NextNProgress from 'nextjs-progressbar';
import { useSWRConfig } from "swr";
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {

  const [title, setTitle] = useState('');
  const [workshopMode, setWorkshopMode] = useState(false);
  const [gitUser, setGitUser] = useState(null);
  const [gitRepo, setGitRepo] = useState(null);
  const [instGitUser, setInstGitUser] = useState(null);
  const [instGitRepo, setInstGitRepo] = useState(null);
  const [cacheCleared, setCacheCleared] = useState(false);
  const { cache, mutate } = useSWRConfig()
  const router = useRouter();
  const clearCache = () => {
    cache.clear()
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setInstGitUser(urlParams.get('instUser'));
    setInstGitRepo(urlParams.get('instRepo'));
    if (router.pathname === '/inst' && urlParams.get('user') && urlParams.get('repo')) {
      router.push('/inst?instUser=' + urlParams.get('user') + '&instRepo=' + urlParams.get('repo'))
    }
    if (urlParams.get('user') && urlParams.get('repo')) {
      setGitUser(urlParams.get('user'));
      setGitRepo(urlParams.get('repo'));
    } else {
      console.error('GitHub user or repository is not specified in the URL.');
    }
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

  pageProps.title = title
  pageProps.setTitle = setTitle
  pageProps.workshopMode = workshopMode
  pageProps.setWorkshopMode = setWorkshopMode
  pageProps.gitUser = gitUser
  pageProps.setGitUser = setGitUser
  pageProps.gitRepo = gitRepo
  pageProps.setGitRepo = setGitRepo
  pageProps.instGitUser = instGitUser
  pageProps.setInstGitUser = setInstGitUser
  pageProps.instGitRepo = instGitRepo
  pageProps.setInstGitRepo = setInstGitRepo
  pageProps.clearCache = clearCache

  Object.assign(pageProps, {
    title, setTitle, workshopMode, setWorkshopMode,
  })

  // useCacheProvider hook
  function useCacheProvider() {
    const cache = useRef(new Map());
    useEffect(() => {
      const currentDate = new Date();
      const appCache = localStorage.getItem('app-cache');
      if (appCache) {
        // if at least a day has passed since the cache was set, clear it
        if (localStorage.getItem('app-cache-time') && (currentDate - new Date(localStorage.getItem('app-cache-time'))) > 86400000) {
          localStorage.removeItem('app-cache');
          localStorage.removeItem('app-cache-time');
          // cache.clear();
          console.log('cache cleared')
          return;
        }
        const map = new Map(JSON.parse(appCache));
        map.forEach((value, key) => cache.current.set(key, value));
      }

      const saveCache = () => {
        const appCache = JSON.stringify(Array.from(cache.current.entries()));
        localStorage.setItem('app-cache', appCache);
        const whenSet = new Date()
        localStorage.setItem('app-cache-time', whenSet);
      };

      window.addEventListener('beforeunload', saveCache);
      return () => window.removeEventListener('beforeunload', saveCache);
    }, []);

    return () => cache.current;
  }


  // use hook in SWRConfig
  const provider = useCacheProvider();

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <CssBaseline />
      <ThemeProvider>
        <StyledEngineProvider>
          <main className='container'>
            <SWRConfig value={{ provider }}>
              <PyodideProvider>
                <NextNProgress
                  options={{ easing: 'ease', speed: 200 }} />
                <Component {...pageProps} />
              </PyodideProvider>
            </SWRConfig>
          </main>
        </StyledEngineProvider>
      </ThemeProvider>
      {!workshopMode &&
        <Footer />}
    </>
  )
}

export default MyApp
