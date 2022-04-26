import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools"
import { useRef } from "react";

export default function CodeEditorComponent({code, onChange, maxLines=null, minLines=4, language="python", debounce=null, height='100%', width='100%'}) {
  const uniqueid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    return (
    <AceEditor
    className="editor"
          mode={language}
          theme="monokai"
          onChange={onChange}
          name={uniqueid}
          editorProps={{ $blockScrolling: true }}
          value={code}
          fontSize={22}
          width="auto"
          height="100%"
          minLines={minLines}
          maxLines={maxLines}
          showPrintMargin={false}
          showGutter={true}
          highlightActiveLine={true}
          debounceChangePeriod={debounce}
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
            document.addEventListener("mouseup", e => (
              editorInstance.resize()
            ));
          }}
        />
    )
}
