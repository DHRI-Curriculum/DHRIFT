import Link from 'next/link'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from "react";
import CssBaseline from '@mui/material/CssBaseline';
import Image from 'next/image'
import logo from '../public/images/logos/logo.png';
import { useTheme } from 'next-themes';
import IconButton from '@mui/material/IconButton';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { Fade } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';

export default function Header({ title, instUser, instRepo, gitUser, gitRepo }) {

    const { theme, setTheme } = useTheme()
    const [darkMode, setDarkMode] = useState();

    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };
    const drawerWidth = 240;

    const navItems = ['Workshops', 'Glossary', 'About'];

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Link href={`/inst/?instUser=${instUser}&instRepo=${instRepo}`}
                passHref>
                <Image
                    src={logo}
                    alt={'logo'}
                    width={243}
                    className='logo' />
            </Link>
            <Divider />
            <List>
                {navItems.map((item) => (
                    <ListItem key={item} disablePadding
                        component="a"
                        href={`/${item.toLowerCase()}/?instUser=${instUser}&instRepo=${instRepo}&user=${gitUser}&repo=${gitRepo}`}
                    >
                        <ListItemButton sx={{ textAlign: 'center' }}>
                            <ListItemText primary={item} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    useEffect(() => {
        if (theme === 'dark') {
            setDarkMode(true)
        } else {
            setDarkMode(false)
        }
    }, [theme])


    const themeToggle = (e) => {
        if (theme === 'light') {
            setTheme('dark')
        }
        else {
            setTheme('light')
        }
    }

    return (
        <Fade in={title} timeout={500}>
            <Box
                className=''
                id="back-to-top-anchor"
                sx={{ display: 'flex' }}
            >
                <CssBaseline />
                {gitRepo && gitUser && 
                    <> <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { md: 'none' }, marginTop: '10px', marginLeft: '10px'}}
                    >
                        <MenuIcon />
                    </IconButton>
                        <AppBar
                            position="static"
                            sx={{
                                display: {
                                    xs: 'none',
                                    md: 'block',
                                }
                            }}
                            component='nav'
                            className='topBar-container'>
                            <Toolbar
                                className='topBar'>
                                <IconButton
                                    color="inherit"
                                    aria-label="open drawer"
                                    edge="start"
                                    onClick={handleDrawerToggle}
                                    sx={{ mr: 2, display: { sm: 'none' } }}
                                >
                                    <MenuIcon />
                                </IconButton>
                                <Link href={`http://www.dhrift.org`}
                                    passHref>
                                    <Image
                                        src={logo}
                                        alt={'logo'}
                                        width={463.5}
                                        className='logo' />
                                </Link>
                                <div
                                    id='nav-container'
                                >
                                    {/* <Typography variant="h6" component="div"
                                        sx={{
                                            flexGrow: 1,
                                            flexShrink: 1,
                                        }}>
                                    </Typography> */}
                                    <ul className='links'>
                                        {instUser && instRepo && <li>
                                            <Link href={`/workshops/?instUser=${instUser}&instRepo=${instRepo}&user=${gitUser}&repo=${gitRepo}`} passHref>Workshops</Link>
                                        </li>}
                                        <li>
                                            <Link href={`/glossary/?instUser=${instUser}&instRepo=${instRepo}&user=${gitUser}&repo=${gitRepo}`} passHref>Glossary</Link>
                                        </li>
                                        <li>
                                            <Link href='https://www.dhrift.org/about' passHref>About</Link>
                                        </li>
                                    </ul>
                                    {/* <IconButton sx={{ ml: 1 }}
                                        id="dark-mode-toggle"
                                        onClick={(e) => themeToggle(e)}
                                        color="inherit">
                                        {darkMode === true ? <Brightness7Icon /> : <DarkModeIcon />}
                                    </IconButton> */}
                                </div>
                            </Toolbar>
                        </AppBar>
                    </>
                }
                <nav>
                    <Drawer
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                        sx={{
                            display: { xs: 'block', md: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                    >
                        {drawer}
                    </Drawer>
                </nav>
            </Box>
        </Fade>
    );
}