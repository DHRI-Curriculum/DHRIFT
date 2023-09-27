import HomeIcon from '@mui/icons-material/Home';
import Sidebar from './ToC';
import { useState } from 'react';
import { useRouter } from 'next/router';


export default function WorkshopHeader({ currentPage, setCurrentPage, pageTitles, pages, workshopTitle,
    setCurrentContent, handlePageChange, instUser, instRepo
}) {

    const [drawerOpen, setDrawerOpen] = useState(false);
    const router = useRouter();
    const instURL = '../inst/?user=' + instUser + '&repo=' + instRepo;
    const currentPageParent = pageTitles[currentPage - 1]?.parent ? pageTitles[currentPage - 1].parent : null;

    return (
        <div className='workshop-header'>
            <div className='workshop-header-left'>
                <h1>DHRIFT</h1>
                <div className='workshop-header-breadcrumbs'>
                    {pages && instUser && instRepo &&
                        <HomeIcon
                            className='home-icon'
                            sx={{
                                cursor: 'pointer',
                            }}
                            onClick={() => { router.push(instURL) }} />
                    }
                    <p>/</p>
                    {workshopTitle &&
                        <p className='crumb'>{workshopTitle}</p>}
                    <p>/</p>
                    {currentPageParent &&
                        <>
                            <p className='crumb'>{currentPageParent}</p>
                            <p>/</p>
                        </>
                    }
                    {pageTitles[currentPage - 1] &&
                        <p className='crumb'>{pageTitles[currentPage - 1].title}</p>
                    }
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
        </div>
    )
}
