import Link from 'next/link'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from "react";
import CssBaseline from '@mui/material/CssBaseline';
import dynamic from 'next/dynamic';
import Image from 'next/image'
import logo from '../public/images/logos/logo.png';
import ButtonAppBarCollapse from "./ButtonAppBarCollapse";
import { useTheme } from 'next-themes';
import IconButton from '@mui/material/IconButton';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import DarkModeIcon from '@mui/icons-material/DarkMode';

export default function Header({ title }) {


    const { theme, setTheme } = useTheme()
    const [darkMode, setDarkMode] = useState();

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
        <Box
            className=''
            id="back-to-top-anchor"
            sx={{ display: 'flex' }}
        >
            <CssBaseline />
            {/* <ButtonAppBarCollapse
                className='topBar-container'
                sx={{
                    display: {
                        xs: 'block',
                        md: 'none',
                        lg: 'none',
                        xl: 'none',
                        xxl: 'none',
                    }
                }}
            >
                <IconButton sx={{ ml: 1 }}
                    id="dark-mode-toggle"
                    onClick={(e) => themeToggle(e)}

                    color="inherit">
                    {darkMode === true ? <Brightness7Icon /> : <DarkModeIcon />}
                </IconButton>
            </ButtonAppBarCollapse> */}
            <AppBar
                position="static"
                sx={{
                    display: {
                        xs: 'none',
                        md: 'block'
                    },
                    // Zindex: 10000,
                }}
                className='topBar-container'>
                <Toolbar
                    className='topBar'>
                    {/* <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        >
                        <MenuIcon />
                    </IconButton> */}

                    {/* <div
                        id='logo-container'
                    > */}
                    <Link href='/'
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
                        <Typography variant="h6" component="div"
                            sx={{
                                flexGrow: 1,
                                flexShrink: 0,
                            }}>
                            <Link href='/' passHref>
                                {/* truncate to 80 characters */}
                                {/* {title &&
                                    <h2 className='headerLink'>{title.length > 80 ? title.substring(0, 80) + '...' : title}</h2>} */}
                            </Link>
                        </Typography>
                        <ul className='links'>
                            <li>
                                <Link href='/' passHref>Workshops</Link>
                            </li>
                            <li>
                                <Link href='/Glossary' passHref>Glossary</Link>
                            </li>
                            <li>
                                <Link href='/About' passHref>About</Link>
                            </li>
                        </ul>
                        <IconButton sx={{ ml: 1 }}
                            id="dark-mode-toggle"
                            onClick={(e) => themeToggle(e)}
                            color="inherit">
                            {darkMode === true ? <Brightness7Icon /> : <DarkModeIcon />}
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    );
}