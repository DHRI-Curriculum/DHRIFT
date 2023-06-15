import Header from '../components/Header'
// import '../styles/reset.css'
// import '../styles/imports.css'
import { StyledEngineProvider } from '@mui/material/styles';
import '../styles/globals.css'
import '../node_modules/highlight.js/styles/obsidian.css'
import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import CssBaseline from '@mui/material/CssBaseline';
import BackToTop from '../components/ScrollTop'
import dynamic from 'next/dynamic'
import { ThemeProvider } from 'next-themes';
const Footer = dynamic(() => import('../components/Footer'))
import PyodideProvider from '../components/PyodideProvider'
import yaml from '../config.yml';

function MyApp({ Component, pageProps }) {
  const base = '/' + process.env.NEXT_PUBLIC_REPO_NAME
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>{yaml.event}</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.9.4/css/bulma.min.css" integrity="sha512-HqxHUkJM0SYcbvxUw5P60SzdOTy/QVwA1JJrvaXJv4q7lmbDZCmZaqz01UPOaQveoxfYRv1tHozWGPMcuTBuvQ==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto"></link>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato"></link>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Titillium+Web"></link>
        {process.env.NEXT_PUBLIC_GITHUB_ACTIONS == false && <><link rel="icon" href={base + "/images/favicon.ico"} sizes="32x32"></link>
          <link rel="icon" href={base + "/images/favicon.ico"} sizes="192x192"></link>
          <link rel="apple-touch-icon" href={base + "/images/favicon.ico"}></link></>
          ||
          <><link rel="icon" href={"favicon.ico"} sizes="32x32"></link>
            <link rel="icon" href={"favicon.ico"} sizes="192x192"></link>
            <link rel="apple-touch-icon" href={"favicon.ico"}></link></>
        }
      </Head>
      <CssBaseline />
      <ThemeProvider>
        <StyledEngineProvider>
          <Header
            props={pageProps} />
          <main >
            <PyodideProvider>
              <Component {...pageProps} />
            </PyodideProvider>
          </main>
        </StyledEngineProvider>
      </ThemeProvider>
      <Footer />
    </>
  )
}

export default MyApp
