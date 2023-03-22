import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import useMediaQuery from '@mui/material/useMediaQuery';
import Button from '@mui/material/Button';
import TocIcon from '@mui/icons-material/Toc';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';




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

    const rearrangePages = (pages) => {
        // rearrange into parents and children
        let parents = pages.filter(page => page.parent === undefined)
        let children = pages.filter(page => page.parent !== undefined)
        const newPages = parents.map(parent => {
            let newParent = parent
            newParent.children = children.filter(child => child.parent === parent.title)
            return newParent
        })
        return newPages
    }
    const newPages = rearrangePages(pages);
    const CollapsibleList = ({ pages }) => {
        const [open, setOpen] = React.useState(false)
        const handleClick = () => {
            setOpen(!open)
        }
        return (
            // top items are also pages with children
            <React.Fragment>
                {pages.children.length == 0 &&
                    <ListItem>
                        <ListItemText primary={pages.title}
                            className={'sidebar-item'}
                            onClick={() => { handlePageChange(event, pages.index) }}
                            {...pages.active ? { style: { color: 'black' } } : { style: { color: 'white' }  }}
                        />
                    </ListItem>
                }
                {pages.children.length > 0 && <React.Fragment>
                    <ListItem>
                        <ListItemText primary={pages.title}
                            className={'sidebar-item'}
                            onClick={() => { handlePageChange(event, pages.index) }}
                            {...pages.active ? { style: { color: 'black' } } : { style: { color: 'white' }  }}
                        />
                            <ListItemSecondaryAction onClick={handleClick}>
                        { open ? <ExpandLess 
                        onClick={handleClick}
                        sx={{
                            cursor: 'pointer',
                            color: 'white',
                        }}
                         /> : pages.children.some(child => child.active) ? null: <ExpandMore
                        sx={{
                            cursor: 'pointer',
                            color: 'white',
                        }}
                        
                        />}
                        </ListItemSecondaryAction>
                    </ListItem>
                    <Collapse in={
                        // if the page is active, or if any of its children are active
                        pages.active || pages.children.some(child => child.active)
                        // but also when clicked
                        || open
                    } timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {pages.children.map((page, index) => (
                                <ListItem button className={'nested'}
                                    onClick={() => { handlePageChange(event, page.index) }}
                                    key={index}>
                                    <ListItemText primary={page.title}
                                        className={'sidebar-subitem'}
                                        {...page.active ? { style: { color: 'black' } } : { style: { color: 'white' }  }}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Collapse>
                </React.Fragment>}
            </React.Fragment>
        )
    }


    React.useEffect(() => {
        // set the active page
        // const newPages = [...pages]
        newPages.forEach((page, index) => {
            if (page.index === currentPage) {
                page.active = true
            } else {
                page.active = false
            }
            if (page.children) {
                page.children.forEach((child, index) => {
                    if (child.index === currentPage) {
                        child.active = true
                    } else {
                        child.active = false
                    }
                })
            }
        })
    }, [currentPage])

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

            {/* two drawers, one for big screens and one for small screens */}

            <Drawer
                variant="temporary"
                open={state['left']}
                className='drawer-left temporary'
                onClose={toggleDrawer('left', false)}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}

            >
                <nav className='sidenav'>
                    <List>
                        {newPages.map((page, index) => (
                            <CollapsibleList pages={page} key={index} />
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
                   <List>
                        {newPages.map((page, index) => (
                            <CollapsibleList pages={page} key={index} />
                        ))}
                    </List>
                </nav>
            </Drawer>
        </React.Fragment>
    );
}
