import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import yaml from '../config.yml'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import BuildIcon from '@material-ui/icons/Build';
import Masonry from '@mui/lab/Masonry';

const Workshop = dynamic(
  () => import('../components/Workshop'),
  { loading: function loading() { return <p>...</p> } }
)

export default function Home({ workshops }) {

  return (
    <div className='container'>
      <div className='frontpage'>
        <div>
          <div className='frontpage-top'>
            <div className='titleContainer'>
              <h2
                style={{
                  fontFamily: 'Titillium Web',
                }}
                className='title'>{yaml.event}</h2>
              <h2
                style={{
                  fontFamily: 'Titillium Web',
                  fontWeight: '400',
                }}
                className='lineUp'>{yaml.motto || 'Further Expanding Digital Humanities Communities of Practice'}</h2>
            </div>
            <Image
              src={'/images/logo.png'}
              alt={yaml.organization + ' logo'}
              width={200}
              height={200}
              className='frontpage-logo' />
          </div>
          <div className='intro'>
          <div className='sectionTitle'>Description</div>
            <p className='intro-text'>{yaml.intro}</p>
          </div>
        </div>
        <div className='workshops-container'>
          <div className='sectionTitle'><BuildIcon /> Workshops</div>
          <div className='workshops'>
            {workshops.map((workshop, index) => (
              <Workshop key={index} workshop={workshop} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export async function getStaticProps() {
  // Get files from the workshops dir
  const getFilesandProcess = (dir) => {

    const dirents = fs.readdirSync(path.join(dir), { withFileTypes: true })
    const dirFiles = dirents
      .filter((file) => file.isFile())
      .map((file) => file.name);
    // Get slug and frontmatter from workshop
    const markdownFiles = dirFiles.map((filename) => {
      // Create slug
      const slug = filename.replace('.md', '')

      // Get frontmatter
      const markdownWithMeta = fs.readFileSync(
        path.join(dir, filename),
        'utf-8',
      )

      const matterResult = matter(markdownWithMeta)
      const content = matterResult.content
      return {
        slug,
        content: content,
        ...matterResult.data,
      }

    })
    return markdownFiles
  }
  const workshopFiles = getFilesandProcess('workshops')
  const installFiles = getFilesandProcess('guides')
  const insightsFiles = getFilesandProcess('insights')

  return {
    props: {
      workshops: workshopFiles.sort(),
      guides: installFiles.sort(),
      insights: insightsFiles.sort(),
    },
  }
}
