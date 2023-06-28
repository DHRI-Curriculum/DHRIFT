import Link from 'next/link'
import yaml from '../config.yml'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useState, useEffect } from "react";
import CssBaseline from '@mui/material/CssBaseline';
import { styled } from '@mui/material/styles';
import dynamic from 'next/dynamic';
import Image from 'next/image'
import ButtonAppBarCollapse from "./ButtonAppBarCollapse";
import { useTheme } from 'next-themes';
import Switch from '@mui/material/Switch';
import IconButton from '@mui/material/IconButton';
import Brightness7Icon from '@mui/icons-material//Brightness7';
import DarkModeIcon from '@mui/icons-material//DarkMode';


const Drawer = dynamic(
    () => import('../components/Drawer'),
    { loading: function loading() { return <p>...</p> } }
)

export default function Header({ props }) {
    const [propsAvailable, setPropsAvailable] = useState(false);
    const [allWorkshops, setAllWorkshops] = useState([]);
    const [allGuides, setAllGuides] = useState([]);
    const [allInsights, setAllInsights] = useState([]);
    const { theme, setTheme } = useTheme()
    const [darkMode, setDarkMode] = useState();

    useEffect(() => {
        if (props && props.workshops) {
            setPropsAvailable(true)
            setAllWorkshops(props.workshops)
            setAllGuides(props.guides)
            setAllInsights(props.insights)
        }
    }, [props.workshops])

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
            <ButtonAppBarCollapse
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
                <div>hello</div>
            </ButtonAppBarCollapse>
            <AppBar
                position="static"
                sx={{
                    display: {
                        xs: 'none',
                        md: 'block'
                    },
                    Zindex: 10000,
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
                            src={'/images/logos/logo.png'}
                            alt={yaml.organization + ' logo'}
                            width={100}
                            height={100}
                            className='logo' />
                        </Link>
                    {/* </div> */}
                    <div
                        id='nav-container'
                    >
                    <Typography variant="h6" component="div"
                        sx={{
                            flexGrow: 1,
                            flexShrink: 0,
                        }}>
                        <Link href='/' passHref>
                            <h2 className='headerLink'>{yaml.event}</h2>
                        </Link>
                    </Typography>
                    <IconButton sx={{ ml: 1 }}
                        id="dark-mode-toggle"
                        onClick={(e) => themeToggle(e)}
                        color="inherit">
                        {darkMode === true ? <Brightness7Icon /> : <DarkModeIcon />}
                    </IconButton>
                            </div>
                    {/* <Button color="inherit">Login</Button> */}
                </Toolbar>
            </AppBar>
        </Box>
    );
}