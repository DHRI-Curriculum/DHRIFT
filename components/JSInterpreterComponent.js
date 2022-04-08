import ReactDOM from 'react-dom';

export default function JSInterpreterComponent() {
    var JSoutput = function(a) {
        var str = "["
        if (typeof(a)=="object" && a.length) {
            for (var i=0; i < a.length; i++) 
                if (typeof(a[i])=="object" && a[i].length) {
                    str += (i==0?"":" ")+"["
                    for (var j=0; j<a[i].length; j++) 
                        str += a[i][j]+(j==a[i].length-1?
                                "]"+(i==a.length-1?"]":",")+"\n":", ");
                } else str += a[i]+(i==a.length-1?"]":", ");
        } else str = a;
        return str;
    }
    
    var writeln = function(str) {
        if (!str) str="";
        var outnode = document.getElementById("JSoutput");
        outnode.value += JSoutput(str)+"\n";
    }
    
    var JSrun = function() {
        var str;
        var outnode = document.getElementById("JSoutput");
        var code = document.getElementById("JSprogram").value;
        console.log(code);
        outnode.value = "";

        try {
            var result = eval(code);
            writeln(result);
        } catch(e) {
            writeln(e);
        }
        if (str != undefined) {outnode.value += str;}
    }
    
    var keyUp = function(event){
      if (event.which==77 && event.ctrlKey) JSrun();
    }

    // a live html window that can be edited and run
    const htmlWindow = () => {
        return (
        <div className="HTMLWindow">
            <div className="HTMLWindow-header">
                <h3>HTML Window</h3>
            </div>
            <div className="HTMLWindow-body">
                <textarea id="HTMLprogram" className="HTMLWindow-textarea" placeholder="HTML code here"></textarea>
            </div>
            <div className="HTMLWindow-footer">
                <button className="HTMLWindow-button" onClick={() => {
                    var str;
                    var outnode = document.getElementById("HTMLoutput");
                    var htmlText = document.getElementById("HTMLprogram").value;
                    
                    outnode.value = "";
                //    render html as HTML
                    try {
                        ReactDOM.render(htmlText, document.getElementById("HTMLoutput"));
                    } catch(e) {
                        writeln(e);
                    }
                }}>Run</button>
            </div>

        </div>
        )
    }

    const htmlOutput = () => {
        return (
        <div className="HTMLOutput">
            <div className="HTMLOutput-header">
                <h3>HTML Output</h3>
            </div>
            <div className="HTMLOutput-body">
                <div id="HTMLoutput" className="HTMLOutput-textarea" placeholder="HTML output here"></div>
            </div>
        </div>
        )
    }


    return (
        <div className="JSInterpreter">
            <div className="JSInterpreter-header">
                <h1>JS Interpreter</h1>
            </div>
            {htmlWindow()}
            {htmlOutput()}
            <div className="JSInterpreter-content">
                <div className="JSInterpreter-sidebar">
                    <div className="JSInterpreter-sidebar-content">
                        <textarea id="JSprogram" onKeyUp={keyUp}></textarea>
                    </div>
                    <div className="JSInterpreter-sidebar-footer">
                        <button onClick={JSrun}>Run</button>
                    </div>
                </div>
                <div className="JSInterpreter-output">
                    <div className="JSInterpreter-output-header">
                        <h2>Output</h2>
                    </div>
                    <div className="JSInterpreter-output-content">
                        <textarea id="JSoutput" readOnly></textarea>
                    </div>
                </div>
            </div>
        </div>
    );
}
