import Link from 'next/link'
import path from 'path'

export default function Footer() {
    return (
        <footer 
        sx={{Zindex: 20000}}
        >
            <div className="funderImages">
                <div>
                    <a href="http://www.neh.gov/" target="_blank" rel="noreferrer"><img src="//static.dhinstitutes.org/curriculum/website/images/logos/neh.png" className="img-fluid" alt='NEH'/></a>
                </div>
                <div>
                    <a href="https://gcdi.commons.gc.cuny.edu/" target="_blank" rel="noreferrer"><img src="//static.dhinstitutes.org/curriculum/website/images/logos/gcdi.png" className="img-fluid" alt='GCDI'/></a>
                </div>
                <div>
                    <a href="http://www.cuny.edu/" target="_blank" rel="noreferrer"><img src="//static.dhinstitutes.org/curriculum/website/images/logos/cuny.png" className="img-fluid" alt='CUNY'/></a>
                </div>
                <div>
                    <a href="http://www.gc.cuny.edu/" target="_blank" rel="noreferrer"><img src="//static.dhinstitutes.org/curriculum/website/images/logos/gc.png" className="img-fluid" alt='GC'/></a>
                </div>
            </div>

            <div className="funding-text">
                <p align='center'>The Digital Humanities Research Institute is funded through a generous grant from the National Endowment for the Humanities and with support from The Graduate Center&apos;s Provost&apos;s Office.</p>
            </div>
        </footer>
    )
}