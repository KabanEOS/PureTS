import { IconButton, Link } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import SvgIcon from '@material-ui/core/SvgIcon';
import Toolbar from '@material-ui/core/Toolbar';
import MoreIcon from '@material-ui/icons/MoreVert';

import React, { useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

import SCLogo from 'images/SCSygnet.svg';
import { RootState } from 'redux/models/root.state';
import { MouseClickEvent } from 'shared/helpers/common.events';
import { navStyles } from 'shared/mui/navbarStyles';

import HideOnScroll from '../components/HideOnScroll';
import MobileNavMenu from '../components/MobileNavMenu';
import NavMenu from '../components/NavMenu';
import NotificationIcon from '../components/NotificationIcon';
import SystemSettingsIcon from '../components/SystemSettingsIcon';
import { NavbarElements } from '../models/navbarElements.enums';

const Navbar = (): JSX.Element => {
  const navbarElements = useSelector((state: RootState) => state.global.navbarElements);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<HTMLElement | null>(null);

  const classes = navStyles();

  const handleMobileMenuClose = useCallback((): void => {
    setMobileMoreAnchorEl(null);
  }, []);

  const handleMobileMenuOpen = useCallback((event: MouseClickEvent): void => {
    setMobileMoreAnchorEl(event.currentTarget);
  }, []);

  const renderNavbarElement = useCallback((element: NavbarElements): JSX.Element => {
    switch (element) {
      case NavbarElements.ThesisSearchBar:
        return <></>;
    }
  }, []);

  const displayedElements = useMemo(() => {
    return navbarElements.map(element => renderNavbarElement(element));
  }, [navbarElements]);

  return (
    <HideOnScroll>
      <AppBar position="fixed" classes={{ root: classes.appBar }}>
        <Toolbar classes={{ root: classes.toolbar }}>
          <Link
            className="nav-bar__logo"
            component={RouterLink}
            to="/"
          >
            <SvgIcon component={SCLogo as React.ElementType} viewBox="0 0 73 68" style={{ width: 50, height: 50 }} />
          </Link>
          <div className="nav-bar__title">
            <span className="">SCRUM GENERATOR</span>
          </div>

          <div className={classes.grow} />
          <div className={classes.displayElements}>
            {displayedElements}
          </div>
          <div className={classes.sectionDesktop}>
            <NotificationIcon />
            <SystemSettingsIcon />
            <NavMenu />
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={'menu-mobile'}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
          <MobileNavMenu anchorEl={mobileMoreAnchorEl} handleClose={handleMobileMenuClose} />
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
};

export default React.memo(Navbar);