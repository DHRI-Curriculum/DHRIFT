import React, { memo, use, useEffect, useState } from 'react'
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
  const [workshops, setWorkshops] = useState([]);

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
    { revalidateOnFocus: false, revalidateOnReconnect: false, revalidateIfStale: false })
  


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

  useEffect(() => {
    allWorkshops && allWorkshops.map(workshop => {
      if (workshop.type === 'dir') {
        return
      }
      const response = fetch(workshop.url, {
        headers: headers,
        method: 'GET',
      }).then(
        res => res.json()
      ).then(
        // decode from base64
        res => Buffer.from(res.content, 'base64').toString()
      ).then(
        res => {
          const matterResult = matter(res)
          const data = matterResult.data
          setWorkshops(workshops => [...workshops, data])
        }
      ).catch(
        err => {
          console.log('err', err)
          console.log('workshop.url', workshop.url)
        }
      )
    })
  }, [allWorkshops])

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setGitUser(urlParams.get('user'));
    setGitRepo(urlParams.get('repo'));
  }, [gitUser, gitRepo])

  if (!gitUser || !gitRepo) {
    return (
      <div className='home'>
        <div className='home-header'>
          <div className='home-header-left'>
            <h1>Workshop</h1>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className='home'>
      <div className='home-header'>
        <div className='home-header-left'>
          {gitUser && gitRepo ?
            <h1>{gitUser}/{gitRepo}</h1>
            :
            <h1>Workshop</h1>
          }
          {workshops && workshops.map(workshop => {
            return (
              <div className='workshop'>
                <h2>{workshop.title}</h2>
                <p>{workshop.description}</p>
              </div>
            )
          }
          )}
        </div>
      </div>
    </div>
  )
}

