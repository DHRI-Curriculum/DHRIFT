// import InterpreterComponent from './InterpreterComponent';
import PythonEditorComponent from './PythonEditorComponent';
import JSEditorComponent from './JSEditorComponent';
import REditorComponent from './REditorComponent';
import Jupyter from '../Wasm/Jupyter';
import CodeIcon from '@mui/icons-material/Code';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Webvm from '../Wasm/Webvm';
import Webllm from '../Wasm/Webllm';
import HTMLEditorComponent from './HTMLEditorComponent';
import { useState, useEffect, useRef, Fragment } from 'react';

// Display names for editor tabs
const editorLabels = {
    python: 'Python',
    jupyter: 'Jupyter',
    javascript: 'JavaScript',
    r: 'R',
    computer: 'Terminal',
    command_line: 'Terminal',
    html: 'HTML',
    html_css: 'HTML/CSS',
    llm: 'AI Chat',
};

export default function DrawerEditor(props) {

    const editors = props.editors || [];  // available editor tabs
    const activeTab = (props.activeTab || editors[0] || '').toLowerCase();  // currently selected tab
    const setActiveTab = props.setActiveTab;  // function to switch tabs
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
            let maxWidth = 1800;
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

    const scrollContainerRef = useRef(null);

    const whichEditor = () => {

        if (activeTab === 'python') {
            return (
                <PythonEditorComponent language={activeTab}
                    defaultCode={text}
                    text={text}
                    handleOpenClose={handleOpenClose}
                    runButtonNeeded={true}
                    scrollContainerRef={scrollContainerRef}
                    {...props} />
            )
        }
        else if (activeTab === 'jupyter') {
            return (
                <Jupyter
                    handleOpenClose={handleOpenClose}
                    runButtonNeeded={false}
                    {...props}
                />
            )
        }
        else if (activeTab === 'javascript') {
            return (
                <JSEditorComponent language={activeTab}
                    defaultCode={text}
                    handleOpenClose={handleOpenClose}
                    scrollContainerRef={scrollContainerRef}
                    runButtonNeeded={true}
                    {...props} />
            )
        }
        else if (activeTab === 'r') {
            return (
                <REditorComponent language={activeTab}
                    defaultCode={text}
                    handleOpenClose={handleOpenClose}
                    runButtonNeeded={true}
                    {...props} />
            )
        }
        else if (activeTab === 'computer' || activeTab === 'command_line') {
            return (
                <Webvm
                    handleOpenClose={handleOpenClose}
                    runButtonNeeded={false}
                />
            )
        }
        else if (activeTab === 'html' || activeTab === 'html_css') {
            return (
                <HTMLEditorComponent isActive={show} />
            )
        }
        else if (activeTab === 'llm') {
            return (
                <Webllm
                    handleOpenClose={handleOpenClose}
                    runButtonNeeded={false}
                />
            )
        }

        else {
            return (
                <div>
                    <h2>Editor not supported: {activeTab}</h2>
                </div>
            )
        }
    }


    return (
        <Fragment>
            <div className='editor-button-container'>
                <Button
                    aria-label="open drawer"
                    className='editor-button'
                    onClick={handleOpenClose}
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
                    keepMounted: true,
                }}
                sx={{
                    width: { xs: '100%', sm: '100%', md: '45%' },
                    flexShrink: { xs: 1, sm: 0 },
                    '& .MuiDrawer-paper': {
                        width: { xs: '100%', sm: '100%', md: newWidth },
                        boxSizing: 'border-box',
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100vh',
                        overflowY: 'hidden',
                    },
                    display: !show ? 'none' : 'block',
                }}
            >
                <div
                    id="dragger"
                    onMouseDown={event => {
                        handleMousedown(event);
                    }}
                    onClick={event => {
                        event.stopPropagation();
                    }}
                />
                <Button
                    aria-label="close drawer"
                    className='editor-button editor-close-button'
                    onClick={handleOpenClose}
                >
                    <CodeIcon /> Close Editor
                </Button>
                {editors.length > 1 && (
                    <div className="editor-tabs">
                        {editors.map((editor) => {
                            const editorKey = editor.toLowerCase();
                            const label = editorLabels[editorKey] || editor;
                            const isActive = activeTab === editorKey;
                            return (
                                <button
                                    key={editorKey}
                                    className={`editor-tab ${isActive ? 'editor-tab--active' : ''}`}
                                    onClick={() => setActiveTab(editorKey)}
                                >
                                    {label}
                                </button>
                            );
                        })}
                    </div>
                )}
                <div id='drawer-editor' className='drawer-editor' ref={scrollContainerRef}>
                    {whichEditor()}
                </div>
            </Drawer>
        </Fragment>
    )
}
