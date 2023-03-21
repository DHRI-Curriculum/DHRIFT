import {Alert} from '@mui/material';
import { AlertTitle } from '@mui/material';
import LightbulbIcon from '@mui/icons-material/Lightbulb';

export default function InfoAlert({ text }) {
    return (
        <Alert severity="info"
        iconMapping={{ info: <LightbulbIcon /> }}>
            {/* <AlertTitle>Info</AlertTitle> */}
            {text}
        </Alert>
    )
}

