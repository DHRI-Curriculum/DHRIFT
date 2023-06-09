import Link from 'next/link'
import path from 'path'
import Image from 'next/image'

export default function Footer() {
    return (
        <footer 
        sx={{Zindex: 20000}}
        >
            <div className="funderImages">
                <div>
                    <a href="http://www.neh.gov/" target="_blank" rel="noreferrer"><Image 
                    src={'/images/logos/neh.png'}
                    width={'446'}
                            height={'108'}
                    className="img-fluid" alt='NEH'/></a>
                </div>
                <div>
                    <a href="https://gcdi.commons.gc.cuny.edu/" target="_blank" rel="noreferrer"><Image 
                    src={"/images/logos/gcdi.png"} 
                    width={'446'}
                            height={'108'}
                    className="img-fluid" alt='GCDI'/></a>
                </div>
                {/* <div>
                    <a href="http://www.cuny.edu/" target="_blank" rel="noreferrer"><Image 
                    src={"/images/logos/cuny.png"} 
                    width={'446'}
                            height={'108'}
                    className="img-fluid" alt='CUNY'/></a>
                </div> */}
                <div>
                    <a href="http://www.gc.cuny.edu/" target="_blank" rel="noreferrer"><Image 
                    src={"/images/logos/gc_logo.png"} 
                    width={'446'}
                            height={'108'}
                    className="img-fluid" alt='GC'/></a>
                </div>
            </div>

            <div className="funding-text">
                <p align='center'>The Digital Humanities Research Institute is funded through a generous grant from the National Endowment for the Humanities and with support from The Graduate Center&apos;s Provost&apos;s Office.</p>
            </div>
        </footer>
    )
}