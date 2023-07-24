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
// import yaml from '../config.yml';

function MyApp({ Component, pageProps }) {
  const base = '/' + process.env.NEXT_PUBLIC_REPO_NAME
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>{pageProps.workshop.title}</title>
      </Head>
      <CssBaseline />
      <ThemeProvider>
        <StyledEngineProvider>
          <Header
            props={pageProps} />
          <main className='container'>
            <PyodideProvider>
              <Component {...pageProps} />
            </PyodideProvider>
          </main>
        </StyledEngineProvider>
      </ThemeProvider>
      <BackToTop />
      <Footer />
    </>
  )
}

export default MyApp
