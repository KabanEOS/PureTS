import { Tooltip, IconButton, Link } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { navStyles } from 'shared/mui/navbarStyles';

const SystemSettingsIcon = (): JSX.Element => {
  const classes = navStyles();

  return ( 
    <Link component={RouterLink} to="/systemSettings" classes={{ root: classes.navLink }}>
      <Tooltip title={'BBBBB'} arrow>
        <IconButton aria-label="system settings" classes={{ root: classes.navIcon }}>
          <SettingsIcon />
        </IconButton>
      </Tooltip>
    </Link>
  );
};

export default React.memo(SystemSettingsIcon);