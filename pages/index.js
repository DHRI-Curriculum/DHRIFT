import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import yaml from '../config.yml'
import Image from 'next/image'
import Markdown, { compiler } from 'markdown-to-jsx';
import dynamic from 'next/dynamic'
import Schedule from '../components/Schedule'
import Button from '@material-ui/core/Button';

const Workshop = dynamic(
  () => import('../components/MenuItem'),
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
          <div className='registration'>
            {yaml.register?.required && (
              <p>
                {yaml.register.text}
                <Button
                  style={{
                    // backgroundColor: '#f50057',
                    // color: 'white',
                    fontFamily: 'Titillium Web',
                    fontWeight: '400',
                    fontSize: '1.2rem',
                    padding: '0.5rem 1rem',
                    borderRadius: '0rem',
                    marginLeft: '1rem',
                    border: '2px solid #ef3b3a',
                    boxShadow: '#ef3b3a 8px 8px 0px'
                  }}
                  href={yaml.register.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className='registerButton'
                >
                  Register
                </Button>
              </p>
            )}
          </div>
          {yaml.intro &&
            <div className='intro'>
              <div className='sectionTitle'>Description</div>
              <p className='intro-text'><Markdown>{yaml.intro}</Markdown></p>
            </div>
          }
        </div>
        {yaml.schedule &&
          <div className='schedule-container'>
            <Schedule schedule={yaml.schedule} />
          </div>
        }
        {/* <div className='workshops-container'>
          <div className='sectionTitle'><BuildIcon /> Workshops</div>
          <div className='workshops'>
            {workshops.map((workshop, index) => (
              <Workshop key={index} workshop={workshop} index={index} />
            ))}
          </div>
        </div> */}
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
