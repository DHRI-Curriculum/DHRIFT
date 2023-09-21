import HomeIcon from '@mui/icons-material/Home';


export default function WorkshopHeader({ currentPage, setCurrentPage, pageTitles, pages, workshopTitle,
    setCurrentContent
 }) {

    return (
        <div className='workshop-header'>
            <div className='workshop-header-left'>
                <h1>DHRIFT</h1>
            </div>
            <div className='workshop-header-breadcrumbs'>
                {pages &&
                <HomeIcon
                    className='home-icon'
                    onClick={() => {setCurrentPage(1); setCurrentContent(pages[0]);}} />
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
    )
}
