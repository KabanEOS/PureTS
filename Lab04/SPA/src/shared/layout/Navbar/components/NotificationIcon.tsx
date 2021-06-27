import { Tooltip, IconButton, Badge } from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { getSystemNotificationsForNavbar } from 'framework/systemNotifications/actions/systemNotifications.actions';
import { NotificationStatus } from 'framework/systemNotifications/models/systemNotification.enums';
import { RootState } from 'redux/models/root.state';
import { navStyles } from 'shared/mui/navbarStyles';
import notificationStyles from 'shared/mui/systemNotificationStyles';

import NotificationsPopper from './Notification/NotificationsPopper';

const NotificationIcon = (): JSX.Element => {
  const classes = navStyles();
  const systemNotificationClasses = notificationStyles();

  const [notificationsPopperAnchorEl, setNotificationsPopperAnchorEl] = useState<HTMLElement | null>(null);
  const notificationGroups = useSelector((state: RootState) => state.systemNotifications.notificationGroups);

  const handleNotificationsMenuToggle = useCallback((event: any): void => {
    setNotificationsPopperAnchorEl(notificationsPopperAnchorEl ? null : event.currentTarget);
  }, [notificationsPopperAnchorEl]);

  const handleNotificationsMenuClose = useCallback(() => {
    setNotificationsPopperAnchorEl(null);
  }, []);

  const handleGetNotificationGroups = useCallback(async () => {
    getSystemNotificationsForNavbar();
  }, []);

  useEffect(() => {
    handleGetNotificationGroups();
  }, []);

  return (
    <>
      <Tooltip title={'BBBBB'} arrow>
        <IconButton aria-label="show new notifications" color="inherit" classes={{ root: classes.navIcon }} onClick={handleNotificationsMenuToggle}>
          <Badge badgeContent={notificationGroups ? notificationGroups.filter(ng => ng.status === NotificationStatus.New).length : 0} color="secondary" classes={{ badge: systemNotificationClasses.badge }}>
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Tooltip>
      { notificationsPopperAnchorEl &&
        <NotificationsPopper
          anchorEl={notificationsPopperAnchorEl}
          handleNotificationsMenuClose={handleNotificationsMenuClose}
        />
      }
    </>
  );
};

export default React.memo(NotificationIcon);