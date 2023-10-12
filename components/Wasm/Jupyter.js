// provides an iFrame to the Jupyterlite page https://dhri-curriculum.github.io/jupyterlite/repl/index.html?kernel=python
import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function Jupyter(props) {

    const [jupyterSrc, setJupyterSrc] = useState('../../jupyterlite/lab/index.html?path=empty.ipynb');

    // useEffect(() => {
    //     if (props.language === 'python') {
    //     } else if (props.language === 'r') {
    //         setJupyterSrc('../../jupyterlite/repl/index.html?kernel=r');
    //     }
    // }, [props.language])

    // ../../jupyterlite/lab/index.html?fromURL=https://raw.githubusercontent.com/DHRI-Curriculum/workshops/main/notebooks/default.ipynb

    return (
        <>
            <Head>
                <script src='../coi-service.js' async></script>
            </Head>
            <div style={{ width: '100%', height: '100%' }}>
                <iframe src={jupyterSrc}
                    width='100%' height='100%'
                     />
            </div>
        </>
    )

}