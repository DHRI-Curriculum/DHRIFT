import Link from 'next/link'
import randomColor from '../node_modules/randomcolor'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';


export default function Workshop({ workshop, index }) {
  const color1 = randomColor({
    luminosity: 'light',
    count: 1,
  })[0]
  const color2 = randomColor({
    luminosity: 'light',
    count: 1,
  })[0]

  // render color as image
  const renderColor = (color) => {
    return `<svg width="100" height="100" style="background-color: ${color}"></svg>`
  }

  const style = {
    background: `${color1}`,
    height: '140px',
  }

  const themeColors = ['45b1c1', 'ef3b3a', 'ff9933', '9abc4f', '666666', 'd5222c'];

  const getColor = (index) => {
    return themeColors[index % themeColors.length]
  }

  return (
    <Card
      // variant="outlined" 
      className='frontpage-card'>
      <Link href={`/workshops/${workshop.slug}`} passHref>
        <CardContent className='card-content'>
          {/* <div className=''> */}
            <h1 className='overlay'>{workshop.title}</h1>
            <div className='workshop-info'>
              <ul className='objectives'>
              {workshop['learning objectives'].map((objective, index) => {
                if (typeof (objective) === 'object') return null 
                if (index > 1) return null
                return (
                  <li key={index} className='objective'>
                    {objective}
                  </li>
                )
              })}
              </ul>
            </div>
          {/* </div> */}

        </CardContent>
      </Link>
    </Card>
  )
}
