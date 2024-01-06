import { useEffect } from 'react';
import { Button } from '@mui/material';


export default function JupyterLoad({ ...props }) {
    const jupyterSrc = props.jupyterSrc;
    const setJupyterSrc = props.setJupyterSrc;
    const desiredFile = props.IPYNB;
    console.log('desiredFile', desiredFile);

    // const fromURLString = `&fromURL='https://raw.githubusercontent.com/${gitUser}/${gitRepo}/main/notebooks/${desiredFile}`

    // const finalURL = `https://dhri-curriculum.github.io/jupyterlite/lab/index.html?${fromURLString}`;
    // console.log('props', props);
    // console.log('finalURL', finalURL);

    return (
        <div className="download-button"
            style={{
                marginTop: '20px',
            }}
        >
                <Button
                    className="button button-bark button-download"
                    style={{
                        cursor: 'pointer',
                    }}
                    onClick={() => {
                        const fromURLString = `&fromURL=${desiredFile}`
                        const finalURL = `https://dhri-curriculum.github.io/jupyterlite/lab/index.html?${fromURLString}`;
                        setJupyterSrc(finalURL)
                    }}
                >
                    Import Jupyter Notebook
                </Button>
            
        </div>
    )
}
