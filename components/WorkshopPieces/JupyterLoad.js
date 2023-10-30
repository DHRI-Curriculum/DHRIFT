import { useEffect } from 'react';
import { Button } from '@mui/material';


export default function JupyterLoad(props) {
    console.log('props', props);
    const jupyterSrc = props.jupyterSrc;
    const setJupyterSrc = props.setJupyterSrc;

    const uploads = props.allUploads;
    // const fromURLString = uploads.map((upload) => {
    //     return `&fromURL=${upload.download_url}`
    // }
    // ).join('');
    const fromURLString = `&fromURL='https://raw.githubusercontent.com/${props.gitUser}/${props.gitRepo}/main/notebooks/${props.gitFile}.ipynb`


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
                onClick={() => setJupyterSrc(`https://dhri-curriculum.github.io/jupyterlite/lab/index.html?${fromURLString}`)}
            >
            Import Jupyter Notebook
            </Button>
        </div>
    )
}
