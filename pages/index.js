import React, { useEffect, useState } from 'react'
import ConvertMarkdown from '../components/ConvertMarkdown'
import matter from 'gray-matter'
import NewFrontPage from '../components/NewFrontPage';
import Markdown, { compiler } from 'markdown-to-jsx';
// import yaml from '../config.yml'
import logo from '../public/images/logos/logo.png'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';
import TocIcon from '@mui/icons-material/Toc';


export default function Home() {

  return (
    <div className='home'>
      <div className='home-header'>
        <div className='home-header-left'>
          <div className='home-header-left-logo'>
            <Image src={logo} alt='logo' />
          </div>
          <div className='home-header-left-title'>
            <h1>DHRIFT</h1>
          </div>
        </div>
      </div>
    </div>
  )

}
