import { useState, useEffect, Fragment } from 'react';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';

export default function SidebarDrawerV2({
  pages,
  currentPage,
  handlePageChange,
  drawerOpen,
  setDrawerOpen,
}) {
  const state = drawerOpen;
  const setState = setDrawerOpen;

  const toggleDrawer = (open) => {
    setState(open);
  };

  const clickAndClose = (event, index) => {
    handlePageChange(event, index);
    toggleDrawer(false);
  };

  const rearrangePages = (pages) => {
    let parents = pages.filter((page) => page.parent === undefined);
    let children = pages.filter((page) => page.parent !== undefined);
    const newPages = parents.map((parent) => {
      let newParent = { ...parent };
      newParent.children = children.filter((child) => child.parent === parent.title);
      return newParent;
    });
    return newPages;
  };

  const newPages = rearrangePages(pages);

  const CollapsibleList = ({ page }) => {
    const [open, setOpen] = useState(false);
    const hasChildren = page.children && page.children.length > 0;
    const isActive = page.active || (hasChildren && page.children.some((child) => child.active));

    const handleClick = () => {
      setOpen(!open);
    };

    return (
      <Box className="v2-toc-item">
        <ListItem
          className={`v2-toc-list-item ${page.active ? 'active' : ''} ${hasChildren ? 'has-children' : ''}`}
          onClick={() => clickAndClose(null, page.index)}
        >
          <span className="v2-toc-marker" />
          <ListItemText
            primary={page.title}
            className="v2-toc-text"
          />
          {hasChildren && (
            <ListItemSecondaryAction onClick={handleClick} className="v2-toc-expand-action">
              {open || isActive ? (
                <ExpandLess className="v2-toc-expand-icon" />
              ) : (
                <ExpandMore className="v2-toc-expand-icon" />
              )}
            </ListItemSecondaryAction>
          )}
        </ListItem>

        {hasChildren && (
          <Collapse in={isActive || open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding className="v2-toc-sublist">
              {page.children.map((child) => (
                <ListItem
                  key={`child-${child.index}-${child.title}`}
                  className={`v2-toc-subitem ${child.active ? 'active' : ''}`}
                  onClick={() => clickAndClose(null, child.index)}
                >
                  <span className="v2-toc-submarker" />
                  <ListItemText primary={child.title} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        )}
      </Box>
    );
  };

  useEffect(() => {
    newPages.forEach((page) => {
      if (page.index === currentPage) {
        page.active = true;
      } else {
        page.active = false;
      }
      if (page.children) {
        page.children.forEach((child) => {
          if (child.index === currentPage) {
            child.active = true;
          } else {
            child.active = false;
          }
        });
      }
    });
  }, [currentPage]);

  return (
    <Fragment>
      <Button
        className="v2-toc-toggle"
        onClick={() => setState(!state)}
        aria-label="Toggle workshop overview"
      >
        <MenuBookIcon />
        <span className="v2-toc-toggle-text">Contents</span>
        {state ? <ExpandLess /> : <ExpandMore />}
      </Button>

      <Drawer
        variant="temporary"
        anchor="right"
        open={state}
        onClose={() => setState(false)}
        className="v2-toc-drawer"
      >
        <Box className="v2-toc-container">
          <div className="v2-toc-header">
            <h2 className="v2-toc-title">Workshop Overview</h2>
            <IconButton
              onClick={() => setState(false)}
              className="v2-toc-close"
              aria-label="Close menu"
            >
              <CloseIcon />
            </IconButton>
          </div>

          <nav className="v2-toc-nav">
            <List>
              {newPages.map((page) => (
                <CollapsibleList page={page} key={`page-${page.index}-${page.title}`} />
              ))}
            </List>
          </nav>
        </Box>
      </Drawer>
    </Fragment>
  );
}
