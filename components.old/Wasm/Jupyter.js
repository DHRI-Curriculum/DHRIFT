import { useState, useEffect } from 'react';
import Head from 'next/head';
import Script from 'next/script';

export default function Jupyter(props) {
    const jupyterSrc = props.jupyterSrc;
    const setJupyterSrc = props.setJupyterSrc;

    useEffect(() => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.getRegistrations()
                .then(function (registrations) {
                    for (let registration of registrations) {
                        console.log(registration);
                        // if (registration.active.scriptURL == 'coi-serviceworker.js') {
                        registration.unregister();
                        window.location.reload()
                    }
                });
        }
    }, [])

    return (
        <>
            <div style={{ width: '100%', height: '100%' }}>
                <iframe src={jupyterSrc} id='iframe'
                    width='100%' height='100%'
                />
            </div>
        </>
    )

}