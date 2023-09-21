import React, { memo, use, useEffect, useState } from 'react'
import WorkshopsView from '../components/WorkshopsView';


export default function Test() {

  const [gitUser, setGitUser] = useState(null);
  const [gitRepo, setGitRepo] = useState(null);

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
          {
            gitUser && gitRepo &&
            <WorkshopsView gitUser={gitUser} gitRepo={gitRepo} />
          }
        </div>
      </div>
    </div>
  )
}