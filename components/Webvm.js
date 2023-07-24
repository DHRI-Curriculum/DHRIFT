import EditorTopbar from './Editor/EditorTopbar';
import Script from 'next/script';

export default function Webvm(props) {
    return (
        <div className='webvm'>
            <Script
                strategy='beforeInteractive'
               
                src='../../coi-service.js' />
        <EditorTopbar {...props} />    
            <iframe src='../../webvm/index.html' width='100%' height='100%'></iframe>
        </div>
    )
}