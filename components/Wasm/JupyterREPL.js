// provides an iFrame to the Jupyterlite page https://dhri-curriculum.github.io/jupyterlite/repl/index.html?kernel=python
import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function Jupyter(props) {


    return (
        <>
            <Head>
                <script src='../coi-service.js' async></script>
            </Head>
            <div style={{ width: '100%', height: '100%' }}>
                <iframe src={'../../jupyterlite/repl/index.html?kernel=python'}
                    id='iframe'
                    width='100%' height='100%'
                    style={{ zoom: '1.8' }}
                />
            </div>
        </>
    )

}