import Link from 'next/link'
import randomColor from '../node_modules/randomcolor'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Image from 'next/future/image'

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
    className='frontpage-card'
    sx={{
      borderRadius: '0px',
      border: '#'+ getColor(index) +' 3px solid',
      boxShadow: '#'+ getColor(index) +' 8px 8px 0px',
    }}
    >
      <Link href={`/workshops/${workshop.slug}`} passHref>
        <CardContent className='card-content'>
          {
            workshop.cover_image ?
              <div>
                <CardMedia
                  className='card-media'
                  title={workshop.title}
                >
                  <div className='frontpage-image-container' >
                    <Image
                      src={workshop.cover_image}
                      className='card-image'
                      layout='fill'
                      object-fit='cover'
                      object-position='center'
                    />
                  </div>
                </CardMedia>
                <h1 className='overlay'>{workshop.title}</h1>
                <div className='workshop-info'>
                  {workshop.excerpt}
                </div>
              </div> :
              <div>
                <div className='card-media' style={style}>
                  <div className='workshop-color' dangerouslySetInnerHTML={{ __html: renderColor(color1) }} />
                </div>
                <h1 className='overlay'>{workshop.title}</h1>
                <div className='workshop-info-other'>
                  {workshop.excerpt}
                </div>
              </div>
          }
          {/* <Button size="small" color="primary">
              Start »
            </Button> */}

        </CardContent>
      </Link>
    </Card>
  )
}
