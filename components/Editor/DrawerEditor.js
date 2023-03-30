// import InterpreterComponent from './InterpreterComponent';
import CodeEditorComponent from './PythonEditorComponent';
import CodeIcon from '@mui/icons-material/Code';
import Button from '@mui/material/Button';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import Drawer from '@mui/material/Drawer';
import { useState, useEffect, useRef, Fragment } from 'react';
import yaml from '../../config.yml'

export default function DrawerEditor(props) {

    const language = props.language;  // this is the language of the editor
    // props.editorOpen and props.setEditorOpen are passed in from the parent component
   
    const text = props.text;  // this is the text in the editor
    const setText = props.setText;  // this is the function to set the text in the editor

    const open = props.open;  // this is the state of the drawer
    const setOpen = props.setEditorOpen;  // this is the function to set the state of the drawer
    const [show, setShow] = useState(false);

    // useEffect(() => {
    //     setText(window.localStorage.getItem('code') || '');
    // }, [])

    const handleOpenClose = () => {
        setOpen(!open);
        const timer = 500;
        if (open) {
            setTimeout(() => {
                setShow(!show);
            }, timer);
        } else {
            setShow(!show);
        }
    }

    useEffect(() => {
        if (open) {
            setShow(true);
        }
    }, [open])


    const commitCode = (newText) => {
        // window.localStorage.setItem('code', newText);
    }

    return (
        <Fragment>
            <div className='editor-button-container'>
                <Button
                    aria-label="open drawer"
                    className={'editor-button'}
                    onClick={handleOpenClose}
                    style={{
                        color: "#32c259",
                    }}
                >
                    <CodeIcon />
                </Button>
            </div>
            <Drawer
                variant="persistent"
                anchor="right"
                open={open}
                className='drawer-right'
                onClose={handleOpenClose}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                // if small, then drawer is 100% width, otherwise some portion
                sx={{
                    width: { xs: '100%', sm: '100%', md: '35%' },
                    flexShrink: { xs: 1, sm: 0 },
                    '& .MuiDrawer-paper': { width: { xs: '100%', sm: '100%', md: '35%' }, boxSizing: 'border-box' },
                    display: !show ? 'none' : 'block',
                }}

            >
                <div className='drawer-editor'>
                    <CodeEditorComponent language={language}
                        onChange={commitCode}
                        defaultCode={text}
                        handleOpenClose={handleOpenClose}
                        {...props} />
                </div>
            </Drawer>
        </Fragment>
    )
}

