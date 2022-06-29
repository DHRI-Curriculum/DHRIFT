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
import Image from 'next/future/image'

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function TemporaryDrawer({ files, category, onClick, onClose, open }) {

  const filesList = files.map((file, index) => {
    const color1 = randomColor({
      // luminosity: 'light',
      count: 1,
    })[0]
    const color2 = randomColor({
      // luminosity: 'dark',
      count: 1,
    })[0]

    const style = {
      background: `${color1}`,
      // background: 'linear-gradient(to bottom, ' + color1 + ' 0%, ' + color1 + ' 50%, ' + color2 + ' 50%, ' + color2 + ' 100%)',
      
      minHeight: "140px",
      width: "100%",
      border: '#5d55a5 3px solid',
      boxShadow: '#5d55a5 8px 8px 0px',
    }
    return (

      <Link href={`/${category}/${file.slug}`} passHref key={file.slug + index}>
        <CardContent className='drawer-over'>
          <div className='card-media' style={style}>
            <div className='workshop-color'

            />
          </div>
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

      {/* <div className='paperWorkshops'>
        <div className='paperGrid'>
        {filesList}
        </div>
      </div> */}
    </Box>


  );

  return (
    // icon and button to open top drawer 
    <React.Fragment>
      <a onClick={toggleDrawer('top', true)} className='drawer-click'>
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </a>

      <Drawer anchor="top" open={state['top']} 
      style={{

      }}
      onClose={toggleDrawer('top', false)}>
        {list('top')}
      </Drawer>
    </React.Fragment>
  );
}
