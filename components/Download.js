// a component that lets users download a file. 
import JSZip from "jszip";
import { saveAs } from "file-saver";

export default function Download(props) {

    const allUploads = props.allUploads;
    const chosenUploads = typeof props.files === 'string' ? props.files.split(',') : [];
  
    var filteredUploads = [];
  
    if (chosenUploads != undefined) {
      chosenUploads.forEach(upload => {
        const currentFile = allUploads.find(file => file.slug === upload.trim());
        if (currentFile != undefined) {
          filteredUploads.push(currentFile);
        }
      })
    }

    const handleDownload = (file) => {
        // if there is more than one file, then download all files as a zip
        // if there is only one file, then download that file
        if (filteredUploads.length > 1) {
            console.log(filteredUploads);
            // download all files as a zip
            const zip = new JSZip();
            filteredUploads.forEach(upload => {
                zip.file(upload.slug, upload.content);
            });
            zip.generateAsync({type: 'blob'})
            .then(function(content) {
                saveAs(content, props.workshop.slug + '.zip');
            });
        }
        else {
            // download the single file
            const file = filteredUploads[0];
            const blob = new Blob([file.content], {type: 'text/plain'});
            saveAs(blob, file.slug);
        }
    }

    return (
        <div className="download-button"
        style={{
            marginTop: '20px',
            // marginBottom: '10px',
        }}
        >
            <button 
            className="brutalist-button"
            style={{
                cursor: 'pointer',
            }}
            onClick={() => handleDownload(filteredUploads)}>Download: {filteredUploads.map(file => 
                <span key={file.slug}>{file.slug} </span>
            )}</button>
        </div>
    )
}