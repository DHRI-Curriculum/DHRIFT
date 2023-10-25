// provides an iFrame to the Jupyterlite page https://dhri-curriculum.github.io/jupyterlite/repl/index.html?kernel=python
import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function Jupyter(props) {
    const jupyterSrc = props.jupyterSrc;
    const setJupyterSrc = props.setJupyterSrc;
    
    // const uploads = props.allUploads;
    // const fromURLString = uploads.map((upload) => {
    //     return `&fromURL=${upload.download_url}`
    // }
    // ).join('');

    // useEffect(() => {
    //     if (uploads) {
    //         setJupyterSrc(`../../jupyterlite/lab/index.html?path=empty.ipynb${fromURLString}`);
    //     }
    // }, [uploads])


    // useEffect(() => {
    //     if (props.language === 'python') {
    //     } else if (props.language === 'r') {
    //         setJupyterSrc('../../jupyterlite/repl/index.html?kernel=r');
    //     }
    // }, [props.language])

    // ../../jupyterlite/lab/index.html?fromURL=https://raw.githubusercontent.com/DHRI-Curriculum/workshops/main/notebooks/default.ipynb
    // https://raw.githubusercontent.com/nltk/nltk_data/gh-pages/packages/corpora/gutenberg.zip
    http://localhost:3000/jupyterlite/lab/index.html?fromURL=https://raw.githubusercontent.com/DHRI-Curriculum/workshops/main/notebooks/default.ipynb&fromURL=https://raw.githubusercontent.com/nltk/nltk_data/gh-pages/packages/corpora/



    return (
        <>
            <Head>
                <script src='../coi-service.js' async></script>
            </Head>
            <div style={{ width: '100%', height: '100%' }}>
                <iframe src={jupyterSrc} id='iframe'
                    width='100%' height='100%'
                />
            </div>
        </>
    )

}