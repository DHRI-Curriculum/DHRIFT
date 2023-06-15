import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import yaml from '../config.yml'
import Image from 'next/image'
import Markdown, { compiler } from 'markdown-to-jsx';
import logo from '../public/images/logos/logo.png'
import dynamic from 'next/dynamic'
import Schedule from '../components/Schedule';
import BuildIcon from '@mui/icons-material/Build';
import Button from '@mui/material/Button';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const Workshop = dynamic(
  () => import('../components/MenuItem'),
  { loading: function loading() { return <p>...</p> } }
)

export default function Home({ workshops }) {

  const formattedDate = (date) => {
    const dateObj = new Date(date);
    const modifiedDate = new Date(dateObj.getTime() - dateObj.getTimezoneOffset() * -60000)
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    return modifiedDate.toLocaleDateString('en-US', options);
  };

  let date = null
  if (yaml.date) {
    if (yaml.date === yaml.end_date) {
      date = formattedDate(yaml.date)
    } else {
      date = formattedDate(yaml.date) + ' - ' + formattedDate(yaml.end_date)
    }
  }

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
                className='lineUp'>
                {date}
              </h2>
              <p>{yaml.organization}</p>
              <p>{yaml.location}
              {yaml.google_maps && <LocationOnIcon
              onClick={() => window.open(yaml.google_maps, '_blank')}
              style={{ 
                cursor: 'pointer',
                paddingTop: '5px',
              }}  />}
              </p>
            </div>

            <Image
              src={logo}
              alt={yaml.organization + ' logo'}
              
              className='frontpage-logo' />
          </div>
          <div className='registration'>
            {yaml.register?.required && (
              <p>
                {yaml.register.text}
                {yaml.register.show_button && <Button
                  style={{
                    color: 'var(--foreground)',
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
                </Button>}
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
            <Schedule schedule={yaml.schedule} workshops={workshops} />
          </div>
        }
        {yaml.show_workshops && <div className='workshops-container'>
          <div className='sectionTitle'><BuildIcon /> Workshops</div>
          <div className='workshops'>
            {workshops.map((workshop, index) => (
              <Workshop key={index} workshop={workshop} index={index} />
            ))}
          </div>
        </div>}
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
