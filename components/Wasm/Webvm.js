import EditorTopbar from '../Editor/EditorTopbar';
import Script from 'next/script';
// import COIService from '../../public/coi-service.js';
import Head from 'next/head';

export default function Webvm(props) {
    return (
        <div className='webvm'>
            {/* <Head>

            </Head> */}
            <Script
                id='coi-service'
                strategy='beforeInteractive'
                onLoad={() => {
                    console.log('COI loaded')
                }}
                onError={(err) => {
                    console.log('COI error', err)}}

                src={'../coi-service.js'}
            />
            <EditorTopbar {...props} />
            <iframe src='../../webvm/index.html' width='100%' height='95%'></iframe>
        </div>
    )
}