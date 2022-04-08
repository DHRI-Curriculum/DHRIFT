import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { sortByDate } from '../utils'
import { useEffect, UseState } from 'react'
import dynamic from 'next/dynamic'
import Container from '@mui/material/Container';
import { Typography } from '@mui/material'
import { Breadcrumbs } from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { maxWidth } from '@mui/system'
import BuildIcon from '@material-ui/icons/Build';

const Workshop = dynamic(
  () => import('../components/Workshop'),
   { loading: function loading() {return <p>...</p>} }
 )

export default function Home({ workshops }) {
  return (
    <Container
    disableGutters={true}
    maxWidth="xl"
    >
    <div className='front-page-bkg'>
      <img src = '/images/gc_logo.png' className='gcLogo'/>
      <div>
      <h2 className='title'>DHRI Curriculum Website</h2>
      <Typography>
        <h2 className='lineUp'>Further Expanding Digital Humanities Communities of Practice</h2>
        <br />
        <div className='rectangle'></div>
        <br />
        <p className='intro-text'>The Digital Humanities Research Institute (DHRI) is an <b>intensive, community-oriented,
          and foundational</b> approach to learning technical skills in service of humanities teaching and learning.</p>
        <br />
        <p className='intro-text'>The DHRI curriculum features workshops,
          tutorials, glossaries, resources, reading materials, and more that have been developed
          at The Graduate Center, City University of New York since 2016. Part of a 2019 grant from
          the National Endowment for the Humanities&apos; (NEH) Office of Digital Humanities (ODH),
          DHRI&apos;s curriculum, which was originally developed for in-person workshops, was revised
          in Summer 2020 to better meet the needs of virtual instruction due to the covid-19 pandemic.
          While the curriculum has always been available openly on GitHub, this site creates a more
          user-friendly and functional interface that is <b>open and free for public use</b>.</p>
          </Typography>
      </div>
      {/* <div className="cv">
        <p>The Digital Humanities Research Institute (DHRI) curriculum features workshops,
          tutorials, glossaries, resources, reading materials, and more that have been developed
          at The Graduate Center, City University of New York since 2016. Part of a 2019 grant from
          the National Endowment for the Humanities (NEH) Office of Digital Humanities (ODH),
          DHRI&apos;s curriculum, which was originally developed for in-person workshops, was revised
          in Summer 2020 to better meet the needs of virtual instruction due to the covid-19 pandemic.
          While the curriculum has always been available openly on GitHub, this site creates a more
          user-friendly and functional interface that is open and free for public use.</p>
        <p>The DHRI curriculum focuses on technical skills and concepts upon which additional
          technologies and tools rely. We call these foundational skills. Approximately one-third of
          all workshops at the Institute could be described as foundational: they introduce concepts
          such as the command line, version control & data collaboration, data literacy, and an
          introduction to programming with Python. The materials and workshops on this site are
          designed for users who are either unfamiliar with technology or could simply benefit from
          filling in gaps in their knowledge. Workshops and tutorials here encourage the use of open
          source technologies making them accessible to the widest possible audiences. We believe our
          emphasis on foundational skills demonstrates our commitment to empowering humanities
          researchers to become confident self-teachers and mentors in their own right who can make
          informed decisions about their research materials and methods that will lead to successful,
          sustainable, and long-term research goals.</p>
        <p>Read more about our philosophy on the <a href='https://www.dhinstitutes.org/'>DHRI website</a>.</p>
      </div> */}
      <br />
      {/*<div className ='greybkg'>*/}
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
