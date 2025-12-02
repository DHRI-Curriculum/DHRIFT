export default function JupyterDirective({ ipynb, setJupyterSrc }) {
  const handleClick = () => {
    if (setJupyterSrc && ipynb) {
      // Construct the JupyterLite URL with the notebook
      const jupyterUrl = `https://dhri-curriculum.github.io/jupyterlite/lab/index.html?path=${ipynb}`;
      setJupyterSrc(jupyterUrl);
    }
  };

  return (
    <button
      className="button button-bark"
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    >
      Open in Jupyter: {ipynb}
    </button>
  );
}
