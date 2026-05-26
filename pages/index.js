import { useEffect } from 'react'
import { useRouter } from 'next/router'
// import WorkshopsView from '../components/WorkshopsView';


export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/inst?instUser=dhri-curriculum&instRepo=dhrift-site-template')
  }, [router])

  return (
    <div className='home'>
      <div className='home-header'>
        <div className='home-header-left'>
          DHRIFT
        </div>
      </div>
    </div>
  )
}
