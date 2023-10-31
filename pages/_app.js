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
import { useRouter } from 'next/router';


function MyApp({ Component, pageProps }) {

  const [title, setTitle] = useState('');
  const [workshopMode, setWorkshopMode] = useState(false);
  Object.assign(pageProps, {
    title, setTitle, workshopMode, setWorkshopMode,
  })
  const base = '/' + process.env.NEXT_PUBLIC_REPO_NAME

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

  // function Loading() {
  //   const router = useRouter();
  //   const [loading, setLoading] = useState(false);

  //   useEffect(() => {
  //     const handleStart = (url) => (url !== router.asPath) && setLoading(true);
  //     const handleComplete = (url) => (url === router.asPath) && setTimeout(() => { setLoading(false) }, 2000);

  //     router.events.on('routeChangeStart', handleStart)
  //     router.events.on('routeChangeComplete', handleComplete)
  //     router.events.on('routeChangeError', handleComplete)

  //     return () => {
  //       router.events.off('routeChangeStart', handleStart)
  //       router.events.off('routeChangeComplete', handleComplete)
  //       router.events.off('routeChangeError', handleComplete)
  //     }
  //   })

  //   return loading
  // }


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
