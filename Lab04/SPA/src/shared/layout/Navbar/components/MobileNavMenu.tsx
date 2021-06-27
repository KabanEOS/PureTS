import { IconButton, Menu, MenuItem, Badge, Avatar, ListItem } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SettingsIcon from '@material-ui/icons/Settings';
import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';

import authProvider from 'plugins/level-1/authentication-azuread/authProvider';
import { selectIsInternalModerator } from 'plugins/level-1/authorization/redux/auth.selectors';
import { RootState } from 'redux/models/root.state';
import { navStyles } from 'shared/mui/navbarStyles';

interface Props {
  anchorEl: null | HTMLElement;
  handleClose: () => void;
}

const MobileNavMenu = (props: Props): JSX.Element | null => {
  const classes = navStyles();
  const currentUser = useSelector((state: RootState) => state.user);
  const isInternalMod = useSelector((state: RootState) => selectIsInternalModerator(state));
  const history = useHistory();

  if (!currentUser) {
    return null; //do not render anything if user is anonymous
  }

  return (
    <div className="nav-menu">
      <Menu
        id="simple-menu"
        anchorEl={props.anchorEl}
        keepMounted
        open={Boolean(props.anchorEl)}
        onClose={props.handleClose}
        disableScrollLock
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {currentUser &&
          <ListItem disabled classes={{ disabled: classes.muiDisabled }}>
            <IconButton aria-label="user avatar" color="inherit">
              <Avatar src={process.env.REACT_APP_URL + '/images/avatar/blank-profile-picture.svg'}></Avatar>
            </IconButton>
            {currentUser.name}
          </ListItem>}
        <MenuItem>
          <IconButton aria-label="show new notifications" color="inherit">
            <Badge badgeContent={0} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          {'asdf'}
        </MenuItem>
        { isInternalMod &&
          <MenuItem component={RouterLink} to={'/translations'}>
            <IconButton aria-label="system settings" color="inherit" classes={{ root: classes.navIconBlack }}>
              <SettingsIcon />
            </IconButton>
            {'asdf'}
          </MenuItem>
        }
        <MenuItem onClick={(): void => history.push('/preferences')}>
          <IconButton aria-label="system settings" color="inherit" classes={{ root: classes.navIconBlack }}>
            <SettingsIcon />
          </IconButton>
          {'asdf'}
        </MenuItem>
        
        <MenuItem onClick={(): Promise<void> => authProvider.logout()}>
          <IconButton aria-label="logout" color="inherit" classes={{ root: classes.navIconBlack }}>
            <ExitToAppIcon/>
          </IconButton>
          {'asdf'}
        </MenuItem>
      </Menu>
    </div>
  );
};

export default MobileNavMenu;