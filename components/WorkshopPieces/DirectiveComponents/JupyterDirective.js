import { buildJupyterLiteUrl } from '../../../utils/jupyter';

export default function JupyterDirective({ ipynb, setJupyterSrc, setEditorOpen, setActiveTab }) {
  const handleClick = () => {
    if (ipynb) {
      const jupyterUrl = buildJupyterLiteUrl(ipynb);

      // Set the Jupyter source URL
      if (setJupyterSrc) setJupyterSrc(jupyterUrl);

      // Switch to Jupyter tab and open the drawer
      if (setActiveTab) setActiveTab('jupyter');
      if (setEditorOpen) setEditorOpen(true);
    }
  };

  return (
    <button className="button button-bark jupyter-button" onClick={handleClick}>
      Open in Jupyter
    </button>
  );
}
