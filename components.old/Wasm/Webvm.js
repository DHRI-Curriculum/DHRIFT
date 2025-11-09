import EditorTopbar from '../Editor/EditorTopbar';
import Script from 'next/script';
import Head from 'next/head';

export default function Webvm(props) {
    
    return (
        <div className='webvm'>
            <Head>
                <script src={process.env.NEXT_PUBLIC_ASSET_PREFIX +'/coi-serviceworker.js'} async></script>
            </Head>
            <iframe src='./webvm/index.html' width='100%' height='95%' id="iframe"></iframe>
            {/* <iframe src={'https://zweibel.net/webvm/'} width='100%' height='95%' id="iframe"></iframe> */}
           </div>
    )
}