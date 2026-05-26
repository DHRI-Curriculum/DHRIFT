import Link from 'next/link'
import Image from 'next/image'
import neh from '../public/images/logos/NEH.png';
import gcdi from '../public/images/logos/gcdi.png';
import gc from '../public/images/logos/GC.svg';
import DHRIFTLogo from '../public/images/logos/logo-white.png';

export default function Footer({ workshopMode }) {
    const footerClass = workshopMode ? 'footer-workshop' : 'footer'
    return (
        <footer className={footerClass}>
            <div className="footer-logo">
                <Link href="http://www.dhrift.org">
                    <Image
                        src={DHRIFTLogo}
                        width={400}
                        className="img-fluid"
                        alt='DHRIFT'
                    />
                </Link>
            </div>
            <div className='footer-lower'>
                <div className="funding-text">
                    <p>The Digital Humanities Research Institute is funded through a generous grant from the National Endowment for the Humanities and with support from The Graduate Center&apos;s Provost&apos;s Office.</p>
                </div>
                <div className="funderImages">
                    <div>
                        <a href="http://www.neh.gov/" target="_blank" rel="noreferrer">
                            <Image src={neh} width={153} className="img-fluid" alt='NEH' />
                        </a>
                    </div>
                    <div>
                        <a href="https://gcdi.commons.gc.cuny.edu/" target="_blank" rel="noreferrer">
                            <Image src={gcdi} width={153} className="img-fluid" alt='GCDI' />
                        </a>
                    </div>
                    <div>
                        <a href="http://www.gc.cuny.edu/" target="_blank" rel="noreferrer">
                            <Image src={gc} width={153} className="img-fluid funder-gc" alt='GC' />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}