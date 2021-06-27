import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import NotificationsIcon from '@material-ui/icons/Notifications';
import NotificationsOffIcon from '@material-ui/icons/NotificationsOff';

import React from 'react';
import { useSelector } from 'react-redux';

import { updateSystemNotificationSetting } from 'pages/UserPreferences/actions/user.actions';

import { selectSystemNotificationsActive } from 'plugins/level-1/user/redux/userPreference.selectors';
import { RootState } from 'redux/models/root.state';

import systemNotificationStyles from 'shared/mui/systemNotificationStyles';

const NotificationListOptions = (): JSX.Element => {
  const classes = systemNotificationStyles();
  const notificationsSnackbarActive = useSelector((state: RootState) => selectSystemNotificationsActive(state));
  
  const handleNotificationIconClick = () => {
    updateSystemNotificationSetting(!notificationsSnackbarActive);
  };

  return (
    <div className={`${classes.options} notifications__options`}>
      <div className="notifications__options__button">
        { notificationsSnackbarActive
          ? <NotificationsIcon onClick={handleNotificationIconClick} fontSize="small" className={classes.optionButton}/>
          : <NotificationsOffIcon onClick={handleNotificationIconClick} fontSize="small" className={classes.optionButton}/>
        }
      </div>
      <div className="notifications__options__button">
        <MoreHorizIcon fontSize="small" className={classes.optionButton}/>
      </div>
    </div>
  );
};

export default NotificationListOptions;