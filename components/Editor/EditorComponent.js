import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-r";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools"

export default function CodeEditorComponent({ code, onChange, maxLines = Infinity, minLines = 15, debounce = null, width = '100%', ...props }) {

  const uniqueid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  const height = props.height || '100%';


  return (
    <AceEditor
      className="editor"
      mode={props.language.toLowerCase()}
      theme="monokai"
      onChange={onChange}
      name={uniqueid}
      editorProps={{ $blockScrolling: true }}
      value={code}
      fontSize={22}
      width={width}
      minLines={minLines}
      maxLines={maxLines}
      showPrintMargin={false}
      showGutter={true}
      highlightActiveLine={true}
      debounceChangePeriod={debounce}
      height= {height}
      setOptions={{
        behavioursEnabled: true,
        wrapBehavioursEnabled: true,
        autoScrollEditorIntoView: true,
        wrap: true,
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: false,
        showLineNumbers: true,
        tabSize: 2,
      }}
      onLoad={editorInstance => {
        setTimeout(() => {
          editorInstance.resize();
        }, 20);
        document.addEventListener("mouseup", e => (
          editorInstance.resize()
        ));
      }}
    />
  )
}
