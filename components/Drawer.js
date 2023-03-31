import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import Link from 'next/link'
import CardContent from '@mui/material/CardContent';
import Workshop from './MenuItem';
import Drawer from '@mui/material/Drawer';



export default function TemporaryDrawer({ files, category, onClick, onClose, open }) {

  const filesList = files.map((file, index) => {
    return (
      <Workshop 
      key={index} workshop={file} />
    )
  })

  // remove workshops after the fifth 
  filesList.splice(5)
  // add a 'see all' button to the bottom of the drawer
  filesList.push(
    <Card
      className='menu-card'>
      <Link href={`/workshops`} passHref>
        <CardContent className='card-content'>
          <h1 className='overlay'>See All Workshops</h1>
        </CardContent>
      </Link>
    </Card>
  )

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
      className="drawer"
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div
      className='drawer-list'
      >
        
          {filesList}
        
      </div>
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
