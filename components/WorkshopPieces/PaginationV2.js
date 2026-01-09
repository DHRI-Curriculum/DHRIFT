import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function PaginationV2({
  pages,
  currentPage,
  handlePageChange,
  pageTitles,
  editorOpen,
}) {
  const getPreviousInfo = () => {
    if (currentPage <= 1) return null;
    const prevPage = pageTitles[currentPage - 2];
    if (!prevPage) return null;
    return {
      title: prevPage.title,
      parent: prevPage.parent,
    };
  };

  const getNextInfo = () => {
    if (currentPage >= pages.length) return null;
    const nextPage = pageTitles[currentPage];
    if (!nextPage) return null;
    return {
      title: nextPage.title,
      parent: nextPage.parent,
    };
  };

  const prevInfo = getPreviousInfo();
  const nextInfo = getNextInfo();

  return (
    <nav className="v2-pagination" aria-label="Workshop navigation">
      <button
        className={`v2-pagination-btn v2-pagination-prev ${!prevInfo ? 'disabled' : ''}`}
        onClick={() => handlePageChange(null, currentPage - 1)}
        disabled={!prevInfo}
        aria-label="Previous page"
      >
        <span className="v2-pagination-icon">
          <ArrowBackIcon />
        </span>
        <span className="v2-pagination-content">
          <span className="v2-pagination-label">Previous</span>
          {prevInfo && (
            <span className="v2-pagination-title">
              {prevInfo.parent && (
                <span className="v2-pagination-parent">{prevInfo.parent}: </span>
              )}
              {prevInfo.title}
            </span>
          )}
        </span>
      </button>

      <div className="v2-pagination-center">
        <span className="v2-pagination-page">
          {currentPage} / {pages.length}
        </span>
      </div>

      <button
        className={`v2-pagination-btn v2-pagination-next ${!nextInfo ? 'disabled' : ''}`}
        onClick={() => handlePageChange(null, currentPage + 1)}
        disabled={!nextInfo}
        aria-label="Next page"
      >
        <span className="v2-pagination-content">
          <span className="v2-pagination-label">Next</span>
          {nextInfo && (
            <span className="v2-pagination-title">
              {nextInfo.parent && (
                <span className="v2-pagination-parent">{nextInfo.parent}: </span>
              )}
              {nextInfo.title}
            </span>
          )}
        </span>
        <span className="v2-pagination-icon">
          <ArrowForwardIcon />
        </span>
      </button>
    </nav>
  );
}
