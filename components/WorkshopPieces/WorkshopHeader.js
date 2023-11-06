import HomeIcon from '@mui/icons-material/Home';
import Sidebar from './ToC';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Breadcrumbs } from '@mui/material';


export default function WorkshopHeader({ currentPage, setCurrentPage, pageTitles, pages, workshopTitle,
    setCurrentContent, handlePageChange, instUser, instRepo
}) {
    const [queryString, setQueryString] = useState('');
    const [parentLink, setParentLink] = useState('');
    const [firstPageLink, setFirstPageLink] = useState('');
    const [drawerOpen, setDrawerOpen] = useState(false);
    const router = useRouter();
    const instURL = '../inst/?instUser=' + instUser + '&instRepo=' + instRepo;
    const currentPageParent = pageTitles[currentPage - 1]?.parent ? pageTitles[currentPage - 1].parent : null;

    const currentPageParentPage = (pageTitles[currentPage - 1]?.parentIndex ? pageTitles[currentPage - 1].parentIndex : null) + 1;

    useEffect(() => {
        setQueryString(window.location.search);
    }, [router])

    useEffect(() => {
        if (queryString) {
            const urlParams = new URLSearchParams(queryString);
            urlParams.set('page', currentPageParentPage);
            setParentLink(`${window.location.pathname}?${urlParams}`);
        }
    }, [currentPageParentPage])

    useEffect(() => {
        if (queryString) {
            const urlParams = new URLSearchParams(queryString);
            urlParams.set('page', 1);
            setFirstPageLink(`${window.location.pathname}?${urlParams}`);
        }
    }, [queryString])

    return (
        <div className='workshop-header'>
            <div className='workshop-header-left'>
                {pages && instUser && instRepo &&
                    <Link href={instURL}>
                        <h1 className='workshop-header-title'
                        >DHRIFT</h1>
                    </Link>
                }
                <div className='workshop-header-breadcrumbs'>
                    <Breadcrumbs
                        className='breadcrumbs'
                        separator="›"
                        aria-label="breadcrumb">
                    {pages && instUser && instRepo &&
                        <Link href={instURL}>
                            <HomeIcon
                                className='home-icon'
                                sx={{
                                    cursor: 'pointer',
                                }}
                            />
                        </Link>
                    }
                    {workshopTitle &&
                            <Link href={firstPageLink}
                                onClick={() => {
                                    setCurrentPage(1);
                                }}
                            >
                                {workshopTitle}
                            </Link>
                    }
                    {currentPageParent &&
                                <Link href={parentLink}
                                    onClick={() => {
                                        setCurrentPage(currentPageParentPage);
                                    }}
                                >
                                    {currentPageParent}
                                </Link>
                    }
                    {pageTitles[currentPage - 1] &&
                            // {pageTitles[currentPage - 1].title}
                            <div>
                                {pageTitles[currentPage - 1].title}
                            </div>
                    }
                    </Breadcrumbs>
                </div>
            </div>
            <div className={drawerOpen ? 'workshop-header-right drawer-open' : 'workshop-header-right'}>
                <Sidebar
                    pages={pageTitles}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    setCurrentContent={setCurrentContent}
                    handlePageChange={handlePageChange}
                    drawerOpen={drawerOpen}
                    setDrawerOpen={setDrawerOpen}
                />
            </div>
        </div >
    )
}
