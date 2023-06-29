import CircularProgress from '@mui/material/CircularProgress';
import FileList from "./FileList";
import Button from '@mui/material/Button';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CodeIcon from '@mui/icons-material/Code';


export default function EditorTopbar(props) {
    const spinnerNeeded = props.spinnerNeeded;
    return (
        <>
           {props.snippets && <FileList snippets={props.snippets} />}
            <div className="buttonsContainer">
                                <Button
                    color="primary"
                    aria-label="open drawer"
                    onClick={props.handleOpenClose}
                >
                    <CodeIcon
                        style={{
                            color: "#32c259",
                        }}
                    />
                </Button>
                {(!spinnerNeeded) && <Button
                    onClick={() => {
                        props.run();
                    }}
                    variant="outlined"
                    style={{
                        margin: "10px",
                        width: "100px",
                        height: "25px",
                        backgroundColor: "#32c259",
                        color: "white",
                        fontSize: "20px",
                        borderRadius: "5px",
                        border: "none",
                        boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
                        outline: "none",
                        //   padding: "15px"
                    }}>
                    <PlayArrowIcon style={{
                        marginRight: "10px",
                        fontSize: "20px"
                    }} />
                    Run</Button>}
                {(spinnerNeeded) && <CircularProgress
                    style={{
                        marginLeft: "10px",
                        marginTop: "10px"
                    }}
                />}


                {/* <Button
                    variant="text"
                    onClick={() => {
                        props.setCode(props.defaultCode);
                    }}
                    style={{
                        color: "#32c259",
                        fontSize: "16px",
                        borderRadius: "5px",
                        border: "none",
                        boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
                        outline: "none",
                        margin: "10px",
                        float: "right"
                    }}>
                    Revert Code
                </Button> */}
            </div>
        </>
    )
}