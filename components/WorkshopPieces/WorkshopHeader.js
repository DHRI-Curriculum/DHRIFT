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
    const [workshopPath, setWorkshopPath] = useState('');
    const [parentLink, setParentLink] = useState('');
    const [firstPageLink, setFirstPageLink] = useState('');
    const [drawerOpen, setDrawerOpen] = useState(false);
    const router = useRouter();
    const instURL = '../inst/?instUser=' + instUser + '&instRepo=' + instRepo;
    const currentPageParent = pageTitles[currentPage - 1]?.parent ? pageTitles[currentPage - 1].parent : null;

    const currentPageParentPage = (pageTitles[currentPage - 1]?.parentIndex ? pageTitles[currentPage - 1].parentIndex : null) + 1;

    useEffect(() => {
        setQueryString(window.location.search);
        setWorkshopPath(window.location.pathname.replace(/\/$/, '') || router.pathname);
    }, [router.asPath, router.pathname])

    useEffect(() => {
        if (queryString && workshopPath) {
            const firstPageParams = new URLSearchParams(queryString);
            firstPageParams.set('page', 1);
            setFirstPageLink(`${workshopPath}?${firstPageParams}`);

            const parentPageParams = new URLSearchParams(queryString);
            parentPageParams.set('page', currentPageParentPage);
            setParentLink(`${workshopPath}?${parentPageParams}`);
        }
    }, [queryString, workshopPath, currentPageParentPage])

    return (
        <div className='workshop-header'>
            <div className='workshop-header-left'>
                {pages && instUser && instRepo &&
                    <Link href='https://www.dhrift.org'>
                        <h1 className='workshop-header-title'
                        >DHRIFT</h1>
                    </Link>
                }
                <div className='workshop-header-breadcrumbs' >
                    <Breadcrumbs
                        sx={{
                            display: {
                                xs: 'none',
                                md: 'flex',
                            }
                        }}
                        className='breadcrumbs'
                        separator="›"
                        aria-label="breadcrumb">
                        {pages && instUser && instRepo &&
                            <Link href={instURL} prefetch={false}>
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
                                prefetch={false}
                            >
                                {workshopTitle}
                            </Link>
                        }
                        {currentPageParent &&
                            <Link href={parentLink}
                                onClick={() => {
                                    setCurrentPage(currentPageParentPage);
                                }}
                                prefetch={false}
                            >
                                {currentPageParent}
                            </Link>
                        }
                        {pageTitles[currentPage - 1] &&
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
