import { compiler } from 'markdown-to-jsx';
import Script from 'next/script';
import React, { useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import * as jQuery from 'jquery';
import { useRouter } from 'next/router'

export default function Presentation(props) {
    const [HOnesandHTwos, setHOnesandHTwos] = useState([]);
    const [open, setOpen] = React.useState(false);
    const router = useRouter()
    const currentHeader = props.currentHeader;
    const handleOpen = function () {
        if (currentHeader.className === 'frontpage') {
            setOpen(true);
        }else{
        const HeaderToFind = currentHeader.children[0].props.children.props.children[0];
        const HeaderToFindIndex = HOnesandHTwos.findIndex(function (element) {
            return element.props.children[0] === HeaderToFind;
        });
        const correctSlide = HeaderToFindIndex + 1;
        router.push(`/workshops/${router.query.slug}/?page=${router.query.page}&slideIndex=${correctSlide}`, undefined, { shallow: true, scroll: false });
        setOpen(true);
        }
    }

    const handleClose = () => setOpen(false);

    const content = props.content.content;
    const title = props.content.title;
    // const authors = props.content.authors;

    useEffect(() => {
        globalThis.jQuery = jQuery;
        // press escape to close modal 
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                handleClose();
            }
        }
        window.addEventListener('keydown', handleKeyDown);
    }, [handleClose]);


    // convert markdown to html and split into pages
    const htmlContent = function (content) {
        const htmlifiedContent = compiler(content);
        // split react element array into pages
        const allPages = [];
        const pages = htmlifiedContent.props.children.reduce((acc, curr) => {
            // allPages = [[h1, p, p][h1, p, div]]
            if (typeof curr === 'string') {
                return acc;
            } else if (curr.type === 'h1') {
                allPages.push([curr]);
                HOnesandHTwos.push(curr);
            }
            else if (curr.type === 'h2') {
                allPages.push([curr]);
                HOnesandHTwos.push(curr);
            }
            else {
                allPages[allPages.length - 1].push(curr);
            }
            return acc;
        }, []);
        return (
            allPages
        )
    }
    const slideContent = htmlContent(content)

    const SpectacleDeck = () => {
        const Spectacle = require('spectacle');
        const Deck = Spectacle.Deck;
        const Slide = Spectacle.Slide;
        const Heading = Spectacle.Heading;
        const CodePane = Spectacle.CodePane;

        return (
            <Deck
                style={{
                    height: '100%',
                    width: '100%',
                    backgroundColor: '#fff',
                }}
            >
                <Slide>
                    <Button
                        onClick={handleClose}
                        style={{
                            position: 'absolute',
                            width: '50px',
                        }}
                    >
                        <CancelPresentationIcon />
                    </Button>
                    <Heading size={1}>
                        {title}
                    </Heading>
                    {/* <Heading size={3}>
                        By {authors}
                    </Heading> */}
                </Slide>
                {slideContent.map((page, index) => {
                    return (
                        <Slide
                            key={index}>
                            <Button
                                onClick={handleClose}
                                style={{
                                    position: 'absolute',
                                    width: '50px',
                                }}
                            >
                                <CancelPresentationIcon />
                            </Button>
                            <div className="slides"
                                style={{
                                    overflow: 'auto',
                                    height: '100%',
                                }}
                            >
                                {page.map((item, index) => {
                                    if (item.type === 'h1' || item.type === 'h2') {
                                        return (
                                            <Heading key={index}>
                                                {item.props.children}
                                            </Heading>
                                        )
                                    } else if (item.type === 'CodeEditor') {
                                        return
                                    }

                                    //                                 else if(item.type=== 'pre') {
                                    //                                     return (
                                    //                                         <CodePane 
                                    //                                         key={index}
                                    //                                         showLineNumbers={false}
                                    //                                         language={item.props.className}

                                    //                                         >
                                    // {item.props.children.props.children}
                                    //                                         </CodePane>
                                    //                                     )

                                    //                                 }
                                    else {
                                        return (
                                            <div

                                                key={index}>
                                                {item}
                                            </div>
                                        )
                                    }
                                })}
                            </div>
                        </Slide>
                    )
                })}
            </Deck>
        )
    }
    return (
        <>
            <div>
                <Button onClick={handleOpen}>
                    <SlideshowIcon />
                    Presentation Mode
                </Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <SpectacleDeck />

                </Modal>
            </div>
        </>
    )
}



