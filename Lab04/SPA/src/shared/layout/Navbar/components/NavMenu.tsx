import { Avatar, IconButton, Link, Menu, MenuItem, ListItem } from '@material-ui/core';
import React, { useEffect, useState , useCallback } from 'react';
import { useSelector } from 'react-redux';

import { getCurrentUserAzureAdPhoto } from 'plugins/level-1/authentication-azuread/api-handlers/graph-api.handler';
import authProvider from 'plugins/level-1/authentication-azuread/authProvider';
import { RootState } from 'redux/models/root.state';
import { navStyles } from 'shared/mui/navbarStyles';

const NavMenu = (): JSX.Element | null => {
  const classes = navStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [photoData, setPhotoData] = useState<string>(process.env.REACT_APP_URL + '/images/avatar/blank-profile-picture.svg');
  const currentUser = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const getPhoto = async (): Promise<void> => { 
      if (currentUser && currentUser.aadUserId) {
        const imageBlob = await getCurrentUserAzureAdPhoto();
        const imageUrl = window.URL.createObjectURL(imageBlob);
        setPhotoData(imageUrl);
      }
    };
    getPhoto();
  }, []);

  const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  },[]);

  const handleClose = useCallback((): void => {
    setAnchorEl(null);
  },[]);

  if (!currentUser) {
    return null; //do not render anything if user is anonymous
  }

  return (
    <div className="nav-menu">
      <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} color="inherit">
        <Avatar src={photoData} className={classes.avatar}></Avatar>
      </IconButton>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        disableScrollLock
      >
        {currentUser && 
          <ListItem disabled classes={{ root: classes.muiDisabled }}>
            {currentUser.name}
          </ListItem>
        }
        { !(currentUser?.email && currentUser?.email === currentUser?.dbUserId) && //TEMP!!!!!!!
        <MenuItem component={Link} href="/preferences">
          {'BBBBB'}
        </MenuItem>
        }
        <MenuItem onClick={(): Promise<void> => authProvider.logout()}>
          {'Logout'}
        </MenuItem>
      </Menu>
    </div>
  );
};

export default React.memo(NavMenu);