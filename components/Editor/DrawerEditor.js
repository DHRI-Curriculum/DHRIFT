// import InterpreterComponent from './InterpreterComponent';
import PythonEditorComponent from './PythonEditorComponent';
import JSEditorComponent from './JSEditorComponent';
import REditorComponent from './REditorComponent';
import Jupyter from '../Wasm/Jupyter';
import CodeIcon from '@mui/icons-material/Code';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Webvm from '../Wasm/Webvm';
import HTMLEditorComponent from './HTMLEditorComponent';
import { useState, useEffect, useRef, Fragment } from 'react';

export default function DrawerEditor(props) {

    const language = props.language.toLowerCase();  // this is the language of the editor
    const text = props.text;  // this is the text in the editor
    const open = props.open;  // this is the state of the drawer
    const setOpen = props.setEditorOpen;  // this is the function to set the state of the drawer
    const [show, setShow] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const [lastDownX, setLastDownX] = useState(0);
    const [newWidth, setNewWidth] = useState('45%');

    const handleMousedown = e => {
        setIsResizing(true);
        setLastDownX(e.clientX);
    };

    const handleMouseup = e => {
        setIsResizing(false);
        if (document.getElementById('iframe')) {
            document.getElementById('iframe').style.pointerEvents = 'auto';
        }
        document.body.style.webkitUserSelect = 'auto';
        document.body.style.mozUserSelect = 'auto';
        document.body.style.msUserSelect = 'auto';
        document.body.style.oUserSelect = 'auto';
        document.body.style.userSelect = 'auto';
    };

    useEffect(() => {
        const handleMousemove = e => {
            // we don't want to do anything if we aren't resizing.
            if (!isResizing) {
                return;
            }
            // make the iframe  have pointer-events: none;
            // so that the mousemove event is captured by the parent
            // and not the iframe
            if (document.getElementById('iframe')) {
                document.getElementById('iframe').style.pointerEvents = 'none';
            }
            // disable select on everything
            document.body.style.webkitUserSelect = 'none';
            document.body.style.mozUserSelect = 'none';
            document.body.style.msUserSelect = 'none';
            document.body.style.oUserSelect = 'none';
            document.body.style.userSelect = 'none';


            let offsetRight =
                document.body.offsetWidth - (e.clientX - document.body.offsetLeft);
            let minWidth = 50;
            let maxWidth = 1200;
            if (offsetRight > minWidth && offsetRight < maxWidth) {
                setNewWidth(offsetRight);
            }
        };

        document.addEventListener('mousemove', handleMousemove);
        document.addEventListener('mouseup', handleMouseup);

        return () => {
            document.removeEventListener('mousemove', handleMousemove);
            document.removeEventListener('mouseup', handleMouseup);
        }
    }, [isResizing]);

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
                    runButtonNeeded={true}
                    {...props} />
            )
        }
        else if (language === 'jupyter') {
            return (
                <Jupyter
                    handleOpenClose={handleOpenClose}
                    runButtonNeeded={false}
                    {...props}
                />
            )
        }
        else if (language === 'javascript') {
            return (
                <JSEditorComponent language={language}
                    defaultCode={text}
                    handleOpenClose={handleOpenClose}
                    runButtonNeeded={true}
                    {...props} />
            )
        }
        else if (language === 'r') {
            return (
                <REditorComponent language={language}
                    defaultCode={text}
                    handleOpenClose={handleOpenClose}
                    runButtonNeeded={true}
                    {...props} />
            )
        }
        else if (language === 'computer' || language === 'command_line') {
            return (
                <Webvm
                    handleOpenClose={handleOpenClose}
                    runButtonNeeded={false}
                />
            )
        }
        else if (language === 'html' || language === 'html_css') {
            return (
                <HTMLEditorComponent />
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
                        color: "white",
                    }}
                >
                    <CodeIcon />
                    Open Code Editor
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
                    width: { xs: '100%', sm: '100%', md: '45%' },
                    flexShrink: { xs: 1, sm: 0 },
                    '& .MuiDrawer-paper': {
                        width: { xs: '100%', sm: '100%', md: newWidth }, boxSizing: 'border-box'
                    },
                    display: !show ? 'none' : 'block',
                    overflow: 'hidden',
                }}

            ><div
                    id="dragger"
                    onMouseDown={event => {
                        handleMousedown(event);
                        // setIsResizing(true);
                    }}
                    onClick={event => {
                        event.stopPropagation();
                    }}
                    style={{
                        width: '5px',
                        cursor: 'ew-resize',
                        padding: '4px 0 0',
                        borderTop: '1px solid #ddd',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        bottom: 0,
                        zIndex: '100',
                        backgroundColor: '#f4f7f9'
                    }}
                />
                <Button
                    aria-label="open drawer"
                    className={'editor-button'}
                    onClick={handleOpenClose}
                    style={{
                        color: "white",
                    }}
                >
                    <CodeIcon /> Close Code Editor
                </Button>
                {/* {language === 'jupyter' &&
                    <Button
                        aria-label="load notebook/data"
                        className={'data-load-button'}
                        onClick={() => {
                            JupyterLoad(props);
                        }}
                        style={{
                            color: "white",
                        }}
                    > Load Notebook/Data</Button>
                } */}
                <div className='drawer-editor'>
                    {whichEditor()}
                </div>
            </Drawer>
        </Fragment>
    )
}

