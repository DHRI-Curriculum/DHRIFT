import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Button } from '@mui/material';
import TocIcon from '@mui/icons-material/Toc';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';


export default function SidebarDrawer({ pages, currentPage, handlePageChange }) {

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

    return (
        // icon and button to open top drawer 
        <React.Fragment>

            <Button color="primary"
                aria-label="open drawer"
                className={'sidebar-button'}

                onClick={toggleDrawer('left', true)}>
                <TocIcon />
                Table of Contents
            </Button>
            <Drawer
                variant="temporary"
                open={state['left']}
                className='drawer-left temporary'
                onClose={toggleDrawer('left', false)}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}

            >
                <nav
                    className='sidenav'>
                    <List

                        // dense={true}
                        onClick={toggleDrawer('left', false)}
                        onKeyDown={toggleDrawer('left', false)}>
                        {pages.map((page, index) => (
                            <ListItem key={index}>
                                <ListItemText
                                    style={{
                                        color: currentPage === index + 1 ? '#000' : 'lightseaGreen',
                                        fontSize: '1rem',
                                        fontWeight: 'bold',
                                        cursor: currentPage === index + 1 ? 'default' : 'pointer'
                                    }}
                                    onClick={() => handlePageChange(event, index + 1)}
                                    primary={page} />
                            </ListItem>
                        ))}
                    </List>
                </nav>
            </Drawer>
            <Drawer variant="permanent"
                anchor="left"
                open={state['left']}
                onClose={toggleDrawer('left', false)}
                className='drawer-left permanent'
                sx={{
                    flexShrink: 0,
                    zIndex: 1,
                    display: {
                        xs: 'none',
                        sm: 'none',
                        md: 'none',
                        xl: 'block'
                    },
                }}
            >
                <nav
                    style={{
                        marginTop: '8rem',
                    }}
                    className='sidenav'>
                    <List
                        // dense={true}
                        onClick={toggleDrawer('left', false)}
                        onKeyDown={toggleDrawer('left', false)}>
                        {pages.map((page, index) => (
                            <ListItem key={index}>
                                <ListItemText
                                    style={{
                                        color: currentPage === index + 1 ? 'var(--foreground)' : 'lightseaGreen',
                                        fontSize: '1rem',
                                        fontWeight: 'bold',
                                        cursor: currentPage === index + 1 ? 'default' : 'pointer'
                                    }}
                                    onClick={() => handlePageChange(event, index + 1)}
                                    primary={page} />
                            </ListItem>
                        ))}
                    </List>
                </nav>
            </Drawer>
        </React.Fragment>
    );
}
