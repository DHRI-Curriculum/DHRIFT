import CircularProgress from '@mui/material/CircularProgress';
// import FileList from "./FileList";
import Button from '@mui/material/Button';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CodeIcon from '@mui/icons-material/Code';


export default function EditorTopbar(props) {
    const spinnerNeeded = props.spinnerNeeded;
    const runButtonNeeded = props.runButtonNeeded || false;
    return (
        <div className="editorTopBarButtonsContainer">
            {(!spinnerNeeded && runButtonNeeded) && (
                <Button
                    onClick={() => props.run()}
                    variant="outlined"
                    className="run-button"
                >
                    <PlayArrowIcon />
                    Run
                </Button>
            )}
            {spinnerNeeded && (
                <CircularProgress className="editor-spinner" size={24} />
            )}
        </div>
    )
}
