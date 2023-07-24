import EditorTopbar from './Editor/EditorTopbar';
export default function Webvm(props) {
    return (
        
        <div className='webvm'>
        <EditorTopbar {...props} />    
            <iframe src='../../webvm/index.html' width='100%' height='100%'></iframe>
        </div>
    )
}