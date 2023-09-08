import React, { use, useEffect, useState } from 'react'
import ConvertMarkdown from '../components/ConvertMarkdown'
import matter from 'gray-matter'
import NewFrontPage from '../components/NewFrontPage';
import Markdown, { compiler } from 'markdown-to-jsx';
import logo from '../public/images/logos/logo.png'
import Image from 'next/image'
import useSWR from 'swr'

export default function Home() {

  const [gitUser, setGitUser] = useState(null);
  const [gitRepo, setGitRepo] = useState(null);

  const allFetcher = (headers) => (...args) => fetch(...args, {
    headers: headers,
    method: 'GET',
  }).then(
    res => res.json()
  ).catch(
    err => console.log('err', err)
  )

  let workshopsBuiltURL, headers;
  workshopsBuiltURL = `https://api.github.com/repos/${gitUser}/${gitRepo}/contents/`
  const { data: allWorkshops, isLoading, error } = useSWR(gitUser ? workshopsBuiltURL : null, allFetcher(headers),
  { revalidateOnFocus: false, revalidateOnReconnect: false });
  console.log('allWorkshops', allWorkshops);

  if (process.env.NEXT_PUBLIC_GITHUBSECRET === 'true') {
    headers = new Headers(
      {
        'Content-Type': 'application/json',
        'authorization': `token ${process.env.NEXT_PUBLIC_GITHUBSECRET}`
      });
  } else {
    headers = new Headers(
      {
        'Content-Type': 'application/json',
      });
  }

  const workshopFetcher = (headers) => (...args) => fetch(...args, {
    headers: headers,
    method: 'GET',
  }).then(
    res => res.json()
  ).then(
    // decode from base64
    res => Buffer.from(res.content, 'base64').toString()
  )
  
  function useWorkshop(workshop){
    const { data, error } = useSWR(workshop.url, workshopFetcher(headers),
      { revalidateOnFocus: false, revalidateOnReconnect: false });
    return data;
  }

  let workshops
  allWorkshops && allWorkshops.map(workshop => {
    useWorkshop(workshop);
    workshops.push(workshop);
  })
  console.log('workshops', workshops);



  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setGitUser(urlParams.get('user'));
    setGitRepo(urlParams.get('repo'));
  }, [gitUser, gitRepo])

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
