import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
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
