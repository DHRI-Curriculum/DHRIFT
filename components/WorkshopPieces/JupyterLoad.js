import { useEffect } from 'react';
import { Button } from '@mui/material';


export default function JupyterLoad({ setJupyterSrc, IPYNB: desiredFile }) {
    const handleClick = () => {
        const fromURLString = `&fromURL=${desiredFile}`;
        const finalURL = `https://melodic-moonbeam-e29b67.netlify.app/lab/index.html?${fromURLString}`;
        setJupyterSrc(finalURL);
    };

    return (
        <div className="jupyter-load-container">
            <Button
                className="button button-bark"
                onClick={handleClick}
            >
                Import Jupyter Notebook
            </Button>
        </div>
    );
}
