// a component that lets users download a file. 
import JSZip from "jszip";
import { saveAs } from "file-saver";

export default function Download(props) {
    console.log('props', props);
    const allUploads = props.allUploads;

    const chosenUploads = typeof props.files === 'string' ? props.files.split(',') : [];
    var filteredUploads = [];
    if (chosenUploads != undefined && allUploads.length > 0) {
        chosenUploads.forEach(upload => {
            const currentFile = allUploads?.find(file => file.name === upload.trim());
            if (currentFile != undefined) {
                filteredUploads.push(currentFile);
            }
        })
    }
    console.log('filteredUploads', filteredUploads);

    let headers;
    if (process.env.NEXT_PUBLIC_GITHUBSECRET === 'true') {
        headers = new Headers(
            {
                'Content-Type': 'application/json',
                'authorization': `token ${process.env.NEXT_PUBLIC_GITHUBSECRET}`
            });
    } else {
        headers = new Headers(
            {
                'Content-Type': 'application/json',
            });
    }

    const handleDownload = (file) => {
        if (filteredUploads.length > 0) {
            // download all files as a zip
            const zip = new JSZip();
            var downloadFile = function (url, filename) {
                return new Promise((resolve, reject) => {
                    fetch(url, {
                        headers: headers,
                        method: 'GET',
                    }).then(
                        res => res.json()
                    ).then(
                        // decode from base64
                        res => Buffer.from(res.content, 'base64').toString()
                    ).then(
                        res => {
                            zip.file(filename, res);
                            resolve();
                        }
                    ).catch(
                        err => {
                            console.log('err', err)
                            console.log('workshop.url', url)
                        }
                    )
                })
            }

            var downloadAllFiles = async function (files) {
                for (let i = 0; i < files.length; i++) {
                    await downloadFile(files[i].url, files[i].name);
                }
            }

            downloadAllFiles(filteredUploads).then(() => {
                zip.generateAsync({ type: "blob" })
                    .then(function (content) {
                        saveAs(content, "files.zip");
                    });
            })
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
                    <span key={file.name}>{file.name} </span>
                )}</button>
        </div>
    )
}