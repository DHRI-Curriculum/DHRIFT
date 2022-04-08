import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Link from 'next/link'
import randomColor from '../node_modules/randomcolor'
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Image from 'next/image'

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const BootstrapButton = styled(Button)(({ theme }) => ({
  ...theme.typography.button,
  padding: theme.spacing(1, 2),
  margin: theme.spacing(1),
  color: "green",
}));


export default function TemporaryDrawer({ files, category, onClick, onClose, open }) {

  const filesList = files.map((file, index) => {
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
      height: "140px",
      width: "100%",
    }
    return (

      <Link href={`/${category}/${file.slug}`} passHref key={file.slug + index}>
        <CardContent className='drawer-over'>
          {file.cover_image ?
            <CardMedia
              className='card-media'
              title={file.title}
              >
                <Image
                  src={file.cover_image}
                  height={160}
                  width={300}
                />
            </CardMedia>  
               :
            <div className='card-media' style={style}>
              <div className='workshop-color' dangerouslySetInnerHTML={{ __html: renderColor(color1) }} />
            </div>
          }
          <div className='drawer-over'>
            <Typography gutterBottom variant="h5" component="h2" className='overlay drawer-overlay'>
              {file.title}
            </Typography>
          </div>
        </CardContent>
      </Link>
    )
  })

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      className="drawer-list"
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Grid container
        className='paperWorkshops'>
        <Grid item md={3}
          className='paperGrid'
        >
          {filesList}
        </Grid>
      </Grid>
    </Box>


  );

  return (
    // icon and button to open top drawer 
    <React.Fragment>

      <a onClick={toggleDrawer('top', true)} className='drawer-click'>
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </a>

      <Drawer anchor="top" open={state['top']} onClose={toggleDrawer('top', false)}>
        {list('top')}
      </Drawer>
    </React.Fragment>
  );
}
