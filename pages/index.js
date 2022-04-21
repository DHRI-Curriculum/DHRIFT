import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import yaml from '../config.yml'
import Image from 'next/image'
import logo from '../public/images/logo.png';
import dynamic from 'next/dynamic'
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';
import BuildIcon from '@material-ui/icons/Build';

const Workshop = dynamic(
  () => import('../components/Workshop'),
  { loading: function loading() { return <p>...</p> } }
)

export default function Home({ workshops }) {
  return (
    <Container
      disableGutters={true}
      maxWidth="xl"
    >
      <div className='frontpage card-page'>
        <div>
          <div className='frontpage-top'>
          <Image
            src={logo}
            alt={yaml.organization + ' logo'}
            width={300}
            height={300}
            className='frontpage-logo' />
          <h2 className='title'>{yaml.event}</h2>
          </div>
          <Typography
          >
            <h2 className='lineUp'>{yaml.motto || 'Further Expanding Digital Humanities Communities of Practice'}</h2>
            <div
              style={{
                margin: '10px',
              }}
              className='rectangle'></div>
            <p
              style={{
                margin: '30px',
              }}
              className='intro-text'>{yaml.intro}</p>
          </Typography>
        </div>
        <div className='sectionTitle'><BuildIcon /> Workshops</div>
        <div className='workshops'>
          {workshops.map((workshop, index) => (
            <Workshop key={index} workshop={workshop} />
          ))}
        </div>
      </div>
    </Container>
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
