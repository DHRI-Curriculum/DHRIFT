export default function Jupyter(props) {
    const jupyterSrc = props.jupyterSrc;

    return (
        <div className="jupyter-iframe-container">
            <iframe
                src={jupyterSrc}
                id="iframe"
                title="JupyterLite editor"
                // credentialless is a browser-standard iframe attribute not yet known to this ESLint version.
                // eslint-disable-next-line react/no-unknown-property
                credentialless=""
                width="100%"
                height="100%"
            />
        </div>
    );
}
