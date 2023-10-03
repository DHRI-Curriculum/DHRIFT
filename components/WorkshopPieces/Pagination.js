import { Button } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function Pagination({ pages, currentPage, handlePageChange, pageTitles }) {


    const sectionTitle = function () {
        let theMostRecentH1 = null;
        if (pageTitles[currentPage - 2]?.parent) {
            theMostRecentH1 = pageTitles[currentPage - 2]?.parent;
        } else {
            theMostRecentH1 = pageTitles[currentPage + 1]?.parent;
        }
        return theMostRecentH1;
    }
    const goBackString = function () {
        if (sectionTitle() !== pageTitles[currentPage - 2]?.title) {

            return (
                <>
                    {sectionTitle()}: <p>{pageTitles[currentPage - 2]?.title}</p>
                </>
            )
        } else {
            return (
                <>
                    {pageTitles[currentPage - 2]?.title}
                </>
            )
        }
    }
    const nextH1 = pageTitles[currentPage]?.parent ? pageTitles[currentPage]?.parent : pageTitles[currentPage]?.title;
    const goForwardString = function () {
        if (nextH1 !== pageTitles[currentPage]?.title) {
            return (
                <>
                    {nextH1}: <p>{pageTitles[currentPage]?.title}</p>
                </>
            )
        } else {
            return (
                <>
                    {pageTitles[currentPage]?.title}
                </>
            )
        }
    }

    return (
        <div className='pagination'>
            <Button
                className='pagination-button'
                onClick={() => handlePageChange(event, Number(currentPage) - 1)}
                disabled={currentPage === 1}
            >
                <ArrowBackIcon />
                {currentPage === 1 ? 'Frontmatter' : goBackString()}
            </Button>
            <Button
                className='pagination-button'
                onClick={() => handlePageChange(event, Number(currentPage) + 1)}
                disabled={currentPage === pages.length}
                sx={{
                    justifySelf: 'flex-end',
                }}
            >
                {currentPage === pages.length ? 'Frontmatter' : goForwardString()}
                <ArrowForwardIcon />
            </Button>
        </div>
    )
}