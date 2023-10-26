import { useState, useEffect } from 'react';
import Head from 'next/head';
import Script from 'next/script';

export default function Jupyter(props) {
    const jupyterSrc = props.jupyterSrc;
    const setJupyterSrc = props.setJupyterSrc;
    


    // useEffect(() => {
    //     if (uploads) {
    //         setJupyterSrc(`../../jupyterlite/lab/index.html?path=empty.ipynb${fromURLString}`);
    //     }
    // }, [uploads])

    // useEffect(() => {
    //     if (window.coi){
    //         window.coi.shouldRegister = () => false;
    //         window.crypto.shouldDeregister = () => true;
    //         window.coi.doReload = () => false;
    //     }
    // }, [])

    return (
        <>

            <div style={{ width: '100%', height: '100%' }}>
                <iframe src={jupyterSrc} id='iframe'
                    width='100%' height='100%'
                    // cors stuff

                />
            </div>
        </>
    )

}