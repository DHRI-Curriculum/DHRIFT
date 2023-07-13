// import InterpreterComponent from './InterpreterComponent';
import PythonEditorComponent from './PythonEditorComponent';
import JSEditorComponent from './JSEditorComponent';
import REditorComponent from './REditorComponent';
import CodeIcon from '@mui/icons-material/Code';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import { useState, useEffect, useRef, Fragment } from 'react';
// import RSideRepl from './RSideRepl';

export default function DrawerEditor(props) {
    const language = props.language.toLowerCase();  // this is the language of the editor

    const text = props.text;  // this is the text in the editor

    const setText = props.setText;  // this is the function to set the text in the editor

    const open = props.open;  // this is the state of the drawer
    const setOpen = props.setEditorOpen;  // this is the function to set the state of the drawer
    const [show, setShow] = useState(false);


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

    const whichEditor = () => {
        if (language === 'python') {
            return (
                <PythonEditorComponent language={language}
                    defaultCode={text}
                    handleOpenClose={handleOpenClose}
                    {...props} />
            )
        }
        else if (language === 'javascript') {
            return (
                <JSEditorComponent language={language}
                    defaultCode={text}
                    handleOpenClose={handleOpenClose}
                    {...props} />
            )
        }
        else if (language === 'r') {
            return (
                <REditorComponent language={language}
                    defaultCode={text}
                    handleOpenClose={handleOpenClose}
                    {...props} />
            )
        }
        else {
            return (
                <div>
                    <h2>Language not supported</h2>
                </div>
            )
        }
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
                    {whichEditor()}
                </div>
            </Drawer>
        </Fragment>
    )
}

