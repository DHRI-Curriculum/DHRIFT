import Button from '@mui/material/Button';
import DownloadIcon from '@mui/icons-material/Download';
import { useState } from 'react';

export default function Download(props) {
    const allUploads = props.allUploads;
    const [downloadError, setDownloadError] = useState('');
    const [isDownloading, setIsDownloading] = useState(false);

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

        setDownloadError('');
        setIsDownloading(true);

        try {
            const [zipModule, fileSaverModule] = await Promise.all([
                import('jszip'),
                import('file-saver'),
            ]);
            const JSZip = zipModule.default || zipModule;
            const saveAs = fileSaverModule.saveAs || fileSaverModule.default;
            const zip = new JSZip();

            // Download each file using the raw download_url
            for (const file of filteredUploads) {
                const response = await fetch(file.download_url);
                if (!response.ok) {
                    throw new Error(`Could not download ${file.name}`);
                }
                const blob = await response.blob();
                zip.file(file.name, blob);
            }

            // Generate and save the zip
            const content = await zip.generateAsync({ type: "blob" });
            saveAs(content, "files.zip");
        } catch (error) {
            setDownloadError(error.message || 'The requested files could not be downloaded.');
        } finally {
            setIsDownloading(false);
        }
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
                disabled={filteredUploads.length === 0 || isDownloading}
            >
                <DownloadIcon />
                <span className="download-label">
                    {isDownloading ? 'Preparing download...' : `Download: ${displayFiles.join(', ')}`}
                </span>
            </Button>
            {downloadError && (
                <p className="download-error" role="alert">
                    {downloadError}
                </p>
            )}
        </div>
    );
}
