import Header from '../components/Header';
import { StyledEngineProvider } from '@mui/material/styles';
import '../styles/globals.css';
import '../node_modules/highlight.js/styles/obsidian.css';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import CssBaseline from '@mui/material/CssBaseline';
import BackToTop from '../components/ScrollTop';
import dynamic from 'next/dynamic';
import { ThemeProvider } from 'next-themes';
const Footer = dynamic(() => import('../components/Footer'))
import PyodideProvider from '../components/PyodideProvider';
import { SWRConfig } from 'swr';
import { useRef } from 'react';
// import yaml from '../config.yml';

function MyApp({ Component, pageProps }) {

  const [title, setTitle] = useState('');
  pageProps.title = title;
  pageProps.setTitle = setTitle;
  const base = '/' + process.env.NEXT_PUBLIC_REPO_NAME

// useCacheProvider hook
function useCacheProvider() {
  const cache = useRef(new Map());

  useEffect(() => {
    const appCache = localStorage.getItem('app-cache');
    if (appCache) {
      const map = new Map(JSON.parse(appCache));
      map.forEach((value, key) => cache.current.set(key, value));
    }

    const saveCache = () => {
      const appCache = JSON.stringify(Array.from(cache.current.entries()));
      localStorage.setItem('app-cache', appCache);
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
        {/* <title>{pageProps.workshop.title}</title> */}
      </Head>
      <CssBaseline />
      <ThemeProvider>
        <StyledEngineProvider>
          <Header
            title={title} />
          <main className='container'>
          <SWRConfig value={{ provider }}>
            <PyodideProvider>
              <Component {...pageProps} />
            </PyodideProvider>
          </SWRConfig>
          </main>
        </StyledEngineProvider>
      </ThemeProvider>
      <BackToTop />
      <Footer />
    </>
  )
}

export default MyApp
