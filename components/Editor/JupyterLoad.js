import { useEffect } from 'react';


export default function JupyterLoad(props) {
    const jupyterSrc = props.jupyterSrc;
    const setJupyterSrc = props.setJupyterSrc;

    const uploads = props.allUploads;
    const fromURLString = uploads.map((upload) => {
        return `&fromURL=${upload.download_url}`
    }
    ).join('');
    setJupyterSrc(`../../jupyterlite/lab/index.html?path=empty.ipynb${fromURLString}`);
}
