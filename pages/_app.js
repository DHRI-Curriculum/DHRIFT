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
          {/* {!workshopMode &&
            <Header
              title={title}
              instUser={instUser}
              instRepo={instRepo}
            />} */}
          <main className='container'>
              <SWRConfig value={{ provider }}>
                <PyodideProvider>
                  <Component {...pageProps} />
                </PyodideProvider>
              </SWRConfig>
          </main>
        </StyledEngineProvider>
      </ThemeProvider>
      {/* <BackToTop /> */}
      {!workshopMode &&
        <Footer />}
    </>
  )
}

export default MyApp
