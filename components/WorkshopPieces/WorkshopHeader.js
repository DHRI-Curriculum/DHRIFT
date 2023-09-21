import HomeIcon from '@mui/icons-material/Home';
import Sidebar from './Sidebar';
import { useRouter } from 'next/router';


export default function WorkshopHeader({ currentPage, setCurrentPage, pageTitles, pages, workshopTitle,
    setCurrentContent, handlePageChange, instUser, instRepo
 }) {

    const router = useRouter();
    const instURL = '../inst/?user=' + instUser + '&repo=' + instRepo;

    return (
        <div className='workshop-header'>
            <div className='workshop-header-left'>
                <h1>DHRIFT</h1>

            <div className='workshop-header-breadcrumbs'>
                {pages && instUser && instRepo &&
                <HomeIcon
                    className='home-icon'
                    onClick={() => {router.push(instURL)}}/>
                }
                <p>/</p>
                {workshopTitle &&
                    <p className='crumb'>{workshopTitle}</p>}
                <p>/</p>
                {pageTitles[currentPage]?.title &&
                    <p className='crumb'>{pageTitles[currentPage].title}</p>
                }
            </div>
            </div>
            <div className='workshop-header-right'>
                <Sidebar
                    pages={pageTitles}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    setCurrentContent={setCurrentContent}
                    handlePageChange={handlePageChange}
                />
            </div>
        </div>
    )
}
