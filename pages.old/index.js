import { useEffect } from 'react'
// import WorkshopsView from '../components/WorkshopsView';


export default function Home() {

  useEffect(() => {
    const urlBase = window.location.href.split('?')[0]
    window.location = urlBase + '/inst?instUser=dhri-curriculum&instRepo=dhrift-site-template'
  })

  return (
    <div className='home'>
      <div className='home-header'>
        <div className='home-header-left'>
        </div>
      </div>
    </div>
  )
}