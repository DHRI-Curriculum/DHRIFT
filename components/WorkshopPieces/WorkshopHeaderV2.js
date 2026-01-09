import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Breadcrumbs, Tooltip } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SidebarDrawerV2 from './ToCv2';

export default function WorkshopHeaderV2({
  currentPage,
  setCurrentPage,
  pageTitles,
  pages,
  workshopTitle,
  setCurrentContent,
  handlePageChange,
  instUser,
  instRepo,
  isFrontmatter = false,
}) {
  const [queryString, setQueryString] = useState('');
  const [parentLink, setParentLink] = useState('');
  const [firstPageLink, setFirstPageLink] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const router = useRouter();
  const instURL = '../inst/?instUser=' + instUser + '&instRepo=' + instRepo;
  const currentPageParent = pageTitles[currentPage - 1]?.parent || null;
  const currentPageParentPage = (pageTitles[currentPage - 1]?.parentIndex || null) + 1;

  // Calculate progress
  const progress = pages.length > 1 ? ((currentPage - 1) / (pages.length - 1)) * 100 : 0;

  useEffect(() => {
    setQueryString(window.location.search);
  }, [router]);

  useEffect(() => {
    if (queryString) {
      const urlParams = new URLSearchParams(queryString);
      urlParams.set('page', currentPageParentPage);
      setParentLink(`./v2?${urlParams}`);
    }
  }, [currentPageParentPage, queryString]);

  useEffect(() => {
    if (queryString) {
      const urlParams = new URLSearchParams(queryString);
      urlParams.set('page', 1);
      setFirstPageLink(`./v2?${urlParams}`);
    }
  }, [queryString]);

  return (
    <header className={`v2-header ${isFrontmatter ? 'v2-header--frontmatter' : ''}`}>
      {/* Progress bar */}
      <div className="v2-header-progress">
        <div
          className="v2-header-progress-bar"
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin="0"
          aria-valuemax="100"
        />
      </div>

      <div className="v2-header-inner">
        {/* Left section - Logo and breadcrumbs */}
        <div className="v2-header-left">
          <Link href="https://www.dhrift.org" className="v2-header-logo">
            <span className="v2-header-logo-text">DHRIFT</span>
          </Link>

          <nav className="v2-header-nav" aria-label="Breadcrumb">
            <Breadcrumbs
              separator={<span className="v2-breadcrumb-sep">/</span>}
              aria-label="breadcrumb"
              className="v2-breadcrumbs"
            >
              {pages && instUser && instRepo && (
                <Tooltip title="Back to Institute" arrow>
                  <Link href={instURL} className="v2-breadcrumb-link">
                    <HomeIcon fontSize="small" />
                  </Link>
                </Tooltip>
              )}

              {workshopTitle && (
                <Link
                  href={firstPageLink}
                  onClick={() => setCurrentPage(1)}
                  className="v2-breadcrumb-link v2-breadcrumb-workshop"
                >
                  {workshopTitle}
                </Link>
              )}

              {currentPageParent && (
                <Link
                  href={parentLink}
                  onClick={() => setCurrentPage(currentPageParentPage)}
                  className="v2-breadcrumb-link v2-breadcrumb-parent"
                >
                  {currentPageParent}
                </Link>
              )}

              {pageTitles[currentPage - 1] && (
                <span className="v2-breadcrumb-current">
                  {pageTitles[currentPage - 1].title}
                </span>
              )}
            </Breadcrumbs>
          </nav>
        </div>

        {/* Right section - Page info and menu */}
        <div className="v2-header-right">
          <span className="v2-header-page-count">
            {currentPage} / {pages.length}
          </span>

          <SidebarDrawerV2
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
    </header>
  );
}
