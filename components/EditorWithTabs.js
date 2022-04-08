import { useRef, useEffect, useState, useContext } from "react";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Script from "next/script";
import dynamic from "next/dynamic";
const EditorComponent = dynamic(
    () => import("./EditorComponent"),
    { ssr: false }
);
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { PyodideContext } from './PyodideProvider';
import CircularProgress from '@mui/material/CircularProgress';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import SaveIcon from '@mui/icons-material/Save';

export default function EditorWithTabsComponent({ defaultCode = "# Write your code here" }) {
    const [currentTab, setCurrentTab] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [tabs, setTabs] = useState([]);
    const [code, setCode] = useState(defaultCode);
    const [pyodideReady, setPyodideReady] = useState(false);
    const [pyodideLoaded, setPyodideLoaded] = useState(false);
    const [pyodideObject, setPyodideObject] = useState(null);
    const outputRef = useRef(null);
    const errorRef = useRef(null);

    const {
        hasLoadPyodideBeenCalled,
        isPyodideLoading,
        setIsPyodideLoading,
        isPyodideReady,
        setIsPyodideReady,
    } = useContext(PyodideContext)

    useEffect(() => {
        if (isPyodideReady) {
            setIsPyodideLoading(false)
        }
    }, [hasLoadPyodideBeenCalled, setIsPyodideLoading, isPyodideReady])

    const onChange = (newValue) => {
        setCode(newValue);
    };


    const runPyodide = async (code) => {
        // clear output and error
        outputRef.current.innerHTML = "";
        errorRef.current.innerHTML = "";
        // let namespace = pyodide.globals.get("IDE")();
        pyodide.globals.set('print', (s) => {
            addToOutput(s);
        });
        pyodide.globals.set('input', (s) => {
            prompt(s);
        });
        await pyodide.loadPackagesFromImports(code);
        return await pyodide.runPythonAsync(code).then(result => {
            addToOutput(result);
        }).catch((err) => {
            addToError(err);
        });

    };

    function showValue() {
        runPyodide(code);
    }

    function addToOutput(s) {
        let output = outputRef.current;
        output.innerText += s + "\n";
        output.scrollTop = output.scrollHeight;
    }

    function addToError(s) {
        let error = errorRef.current;
        error.innerText += s + '\n';
        error.scrollTop = error.scrollHeight;
    }

    const runButton = () => {
        return (
            <div>
                {!isPyodideLoading && <Button
                    onClick={() => {
                        showValue();
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
                        padding: "15px"
                    }}>
                    <PlayArrowIcon style={{
                        marginRight: "10px",
                        fontSize: "20px"
                    }} />
                    Run</Button>}
                {isPyodideLoading && <CircularProgress
                    style={{
                        marginLeft: "10px",
                        marginTop: "10px"
                    }}
                />}
            </div>
        )
    }

    function TabObject(name, tabCode, index, id = Math.random().toString(36).substr(2, 7)) {
        return (
            <Tab
                key={index}
                label={name}
                uniqueid={id}
                onClick={() => {
                    setCurrentTab(index);
                    setCode(tabCode);
                }}
                style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: currentTab === index ? "#32c259" : "white",
                    borderBottom: currentTab === index ? "2px solid #32c259" : "none"
                }}
            />
        )
    }

    // remember current tab's code
    useEffect(() => {
        if (currentTab < tabs.length) {
            setTabs(tabs.map((tab, index) => {
                if (index === currentTab) {
                    return {
                        name: tab.name,
                        code: code,
                        id: tab.id
                    }
                }
                return tab;
            }))
        }
    }, [currentTab, code])

    const editor = () => {
        return (
            <div className="editor-container">
                <div className="editor">
                    <EditorComponent
                        code={code}
                        onChange={onChange}
                    />
                </div>
            </div>
        )
    }

    // output looks like a repl
    const output = () => {
        return (
            <div className="output-container">
                <div className="output">
                    <div className="output-header">
                        <Typography variant="h6" style={{
                            fontSize: "20px",
                            fontWeight: "bold",
                            color: "#32c259",
                            marginBottom: "10px"
                        }}>
                            Output
                        </Typography>
                    </div>
                    <div className="output-body">
                        <div className="output-body-output" ref={outputRef}></div>
                        <div className="output-body-error" ref={errorRef}></div>
                    </div>
                </div>
            </div>
        )
    }


    // const error = () => {
    //     return (
    //         <div className="output">
    //             <div className="output-title">Error</div>
    //             <div className="output-container" ref={errorRef}></div>
    //         </div>
    //     )
    // }

    const tabsContainer = () => {
        return (
            <div className="tabs-container">
                {tabs.map((tab, index) => {
                    return TabObject(tab.name, tab.code, index);
                })}
            </div>
        )
    }

    const addTab = () => {
        let newTabs = tabs;
        newTabs.push({
            name: "Tab " + (tabs.length + 1),
            code: defaultCode
        });
        setTabs(newTabs);
        setCurrentTab(tabs.length - 1);
    }

    const tabContent = () => {
        return (
            <div className="tab-content">
                {editor()}
                {output()}
                {/* {error()} */}
            </div>
        )
    }

    const tabBar = () => {
        return (
            <div className="editorContainer">
                <Toolbar>
                    <div className="tab-bar-left" sx={{ flexGrow: 1 }}>
                        <IconButton
                            onClick={() => {
                                addTab();
                            }}
                            style={{
                                margin: "10px",
                                height: "25px",
                                width: "25px",
                                backgroundColor: "#32c259",
                                color: "white",
                                fontSize: "20px",
                                borderRadius: "5px",
                                border: "none",
                                boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
                                outline: "none",
                                padding: "15px",
                                cursor: "pointer",
                                outline: "none",
                            }}>
                            <AddIcon style={{
                                margin: "10px",
                                fontSize: "20px"
                            }} />
                        </IconButton>
                    </div>
                    <div>
                        {tabsContainer()}
                    </div>
                    <div className="tab-bar-right" style={{
                        marginLeft: "auto",
                        marginRight: -12
                    }}>
                        {runButton()}
                    </div>
                </Toolbar>

            </div>
        )
    }

    const revertCode = () => {
        return (
            <Button
                variant="text"
                onClick={() => {
                    setCode(defaultCode);
                }}
                style={{
                    color: "#32c259",
                    fontSize: "16px",
                    borderRadius: "5px",
                    border: "none",
                    boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
                    outline: "none",
                    padding: "15px",
                    float: "right"
                }}>
                Revert Code
            </Button>
        )
    }

    // const topBar = () => {
    //     return (
    //         <Box className="editorContainer" display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
    //             <AppBar position="static" style={{
    //                 backgroundColor: "black",
    //                 color: "white",
    //                 boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
    //                 padding: "10px"
    //             }}>
    //                 <Toolbar>

    //                     {revertCode()}
    //                 </Toolbar>
    //             </AppBar>
    //         </Box>
    //     )
    // }






    useEffect(() => {
        // set a default tab
        setTabs([{
            name: "Tab 1",
            code: defaultCode
        }]);
        setCurrentTab(0);
    }, []);

    return (
        <div className="container">
            {<><Script src="https://cdn.jsdelivr.net/pyodide/v0.19.0/full/pyodide.js" />
                <Script src="https://cdn.jsdelivr.net/pyodide/v0.19.0/full/pyodide.asm.js"
                    onLoad={() => {
                        if (!isPyodideReady) {
                            async function load() {
                                globalThis.pyodide = await loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.19.0/full/' })
                            }
                            load().then(() => {
                                setIsPyodideReady(true)
                                setPyodideLoaded(true);
                            })
                        }
                    }}
                /></>}
            {tabBar()}
            {tabContent()}
        </div>
    )
}
