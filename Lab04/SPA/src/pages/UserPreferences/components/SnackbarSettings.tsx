import { Switch, Grid } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';

import { selectSystemNotificationsActive } from 'plugins/level-1/user/redux/userPreference.selectors';
import { RootState } from 'redux/models/root.state';

import { updateSystemNotificationSetting } from '../actions/user.actions';

const SnackbarSettings = (): JSX.Element => {
  const systemNotificationsActive = useSelector((state: RootState) => selectSystemNotificationsActive(state));
  
  const handleSystemNotificationChange = async (): Promise<void> => {
    updateSystemNotificationSetting(!systemNotificationsActive);
  };

  return (
    <Grid container spacing={1}>
      <Grid item sm={8} xs={7} className="userPref__section__field">
        {'BBBBB'}
      </Grid>
      <Grid item sm={1} justify="flex-end">
        <Switch
          checked={systemNotificationsActive}
          onChange={handleSystemNotificationChange}
          name="System Notifications"
          inputProps={{ 'aria-label': 'System Notifications switch' }}
        />
      </Grid>
    </Grid>
  );
};

export default SnackbarSettings;