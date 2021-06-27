import { ClickAwayListener } from '@material-ui/core';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';

import React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from 'redux/models/root.state';
import systemNotificationStyles from 'shared/mui/systemNotificationStyles';

import NotificationList from './NotificationList';

interface Props {
  anchorEl: null | HTMLElement;
  handleNotificationsMenuClose: () => void;
}

const NotificationsPopper = (props: Props): JSX.Element | null => {
  const currentUser = useSelector((state: RootState) => state.user);

  if (!currentUser) {
    return null; //do not render anything if user is anonymous
  }

  const systemNotificationClasses = systemNotificationStyles();

  return (
    <ClickAwayListener onClickAway={(): void => props.handleNotificationsMenuClose()}>
      <Popper
        id={Boolean(props.anchorEl) ? 'transitions-popper' : undefined}
        open={Boolean(props.anchorEl)}
        anchorEl={props.anchorEl}
        className={systemNotificationClasses.container}
        placement="bottom-end"
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper className={systemNotificationClasses.popper}>
              <NotificationList />
            </Paper>
          </Fade>
        )}
      </Popper>
    </ClickAwayListener>
  );

};

export default NotificationsPopper;