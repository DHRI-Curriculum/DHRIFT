import { useEffect } from 'react'
// import WorkshopsView from '../components/WorkshopsView';


export default function Home() {

  useEffect(() => {
    window.location = '/inst?user=dhri-curriculum&repo=dhrift-site-template'
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