import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText'
import Button from '@mui/material/Button';
import {useState, useEffect} from 'react';

export default function UploadtoStorage() {
    
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [file, setFile] = useState(null);
    

    const toLocalStorage = () => {
        localStorage.setItem('file', file);
        // add filename to localStorage 'filenames'
        if (localStorage.getItem('filenames')) {
            const filenames = JSON.parse(localStorage.getItem('filenames'));
            filenames.push(file.filename);
            localStorage.setItem('filenames', JSON.stringify(filenames));
        }else{
            localStorage.setItem('filenames', JSON.stringify([file.filename]));
        }
    }
    const handleChange = (event) => {
        setFile(event.target.files[0]);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(file);
        toLocalStorage();
    };

    
    return (
        <div>
            <Button
                className="upload-button"
                onClick={handleOpen}
                variant="contained"
                color="primary"
            >
                Upload to Storage
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Upload to Storage</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Upload a file to the storage bucket.
                    </DialogContentText>
                    <input
                        // accept="image/*"
                        className="upload-input"
                        id="contained-button-file"
                        multiple
                        type="file"
                        onChange={handleChange}
                    />
                    <label htmlFor="contained-button-file">

                    </label>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSubmit} color="primary">
                        Upload
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

