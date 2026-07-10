import { Button } from '@mui/material';
import { buildJupyterLiteUrl } from '../../utils/jupyter';


export default function JupyterLoad({ setJupyterSrc, IPYNB: desiredFile }) {
    const handleClick = () => {
        setJupyterSrc(buildJupyterLiteUrl(desiredFile));
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
