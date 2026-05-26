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
                        registration.unregister();
                        window.location.reload();
                    }
                });
        }
    }, [])

    return (
        <div className="jupyter-iframe-container">
            <iframe src={jupyterSrc} id='iframe' width='100%' height='100%' />
        </div>
    );

}