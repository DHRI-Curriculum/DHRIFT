import Slide from '@mui/material/Slide';
import CodeEditorComponent from './CodeEditorComponent';
import CodeIcon from '@mui/icons-material/Code';
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useState, useEffect, useRef } from 'react';


export default function SlideoutEditor(props) {
    const [editorSlider, setEditorSlider] = useState(false);
    const [code, setCode] = useState('');
    const codeRef = useRef();

    useEffect(() => {
        codeRef.current = window.localStorage.getItem('code');
    }, []);

    useEffect(() => {
        window.localStorage.setItem('code', codeRef.current);
        console.log(codeRef.current);
    }, [codeRef.current]);


    const handleEditorSlider = () => {
        setEditorSlider(!editorSlider);
    }

        return (
            <div>
                <div
                    style={{
                        position: 'fixed',
                        top: 300,
                        right: 0,
                        display: editorSlider ? 'none' : 'block'
                    }}
                >
                    <Button onClick={handleEditorSlider}
                        style={{
                            backgroundColor: 'black',
                        }}
                    >
                        {editorSlider ? <ArrowForwardIcon
                            style={{
                                color: 'white',
                            }}
                        /> : <CodeIcon
                            style={{
                                color: 'white',
                            }}
                        />}
                    </Button>
                </div>
                <Slide
                    direction="left"
                    in={editorSlider}
                    style={{
                        position: 'fixed',
                        width: '100%',
                        height: '100%',
                        top: 300,
                    }}
                    mountOnEnter
                    unmountOnExit
                >
                    <div>
                        <Button onClick={handleEditorSlider}
                            style={{
                                backgroundColor: 'black',
                            }}
                        >
                            <ArrowForwardIcon
                                style={{
                                    color: 'white',
                                }} />
                        </Button>
                        <CodeEditorComponent minLines={10} code={codeRef.current} />
                    </div>
                </Slide>
            </div>
        )
    }