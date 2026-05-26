import Button from '@mui/material/Button';
import DownloadIcon from '@mui/icons-material/Download';
import JSZip from "jszip";
import { saveAs } from "file-saver";

export default function Download(props) {
    const allUploads = props.allUploads;

    const chosenUploads = typeof props.files === 'string' ? props.files.split(',') : [];
    const filteredUploads = [];
    if (chosenUploads != undefined && allUploads?.length > 0) {
        chosenUploads.forEach(upload => {
            const currentFile = allUploads?.find(file => file.name === upload.trim());
            if (currentFile != undefined) {
                filteredUploads.push(currentFile);
            }
        });
    }

    const handleDownload = async () => {
        if (filteredUploads.length === 0) return;

        const zip = new JSZip();

        // Download each file using the raw download_url
        for (const file of filteredUploads) {
            try {
                const response = await fetch(file.download_url);
                const blob = await response.blob();
                zip.file(file.name, blob);
            } catch (error) {
                console.error(`Failed to download ${file.name}:`, error);
            }
        }

        // Generate and save the zip
        const content = await zip.generateAsync({ type: "blob" });
        saveAs(content, "files.zip");
    };

    // If no matching files found, show the requested filenames anyway
    const displayFiles = filteredUploads.length > 0
        ? filteredUploads.map(f => f.name)
        : chosenUploads.map(f => f.trim()).filter(Boolean);

    if (displayFiles.length === 0) return null;

    return (
        <div className="download-button-container">
            <Button
                className="button button-download"
                onClick={handleDownload}
                disabled={filteredUploads.length === 0}
            >
                <DownloadIcon />
                <span className="download-label">
                    Download: {displayFiles.join(', ')}
                </span>
            </Button>
        </div>
    );
}