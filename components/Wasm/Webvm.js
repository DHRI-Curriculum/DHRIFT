export default function Webvm(props) {
    // webvm/index.html has its own serviceWorker.js for cross-origin isolation
    return (
        <div className='webvm'>
            <iframe src='./webvm/index.html' title="Linux Terminal" />
        </div>
    )
}