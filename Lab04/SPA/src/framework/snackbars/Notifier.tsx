import { SnackbarKey, useSnackbar } from 'notistack';
import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { RootState } from 'redux/models/root.state';

import { reduxCloseSnackbar, reduxRemoveSnackbar } from './redux/action.creator';

//TODO: Check this out eventually in PV4. This should not be useState.
let displayed: SnackbarKey[] = [];

const Notifier = (): null => {
  const dispatch = useDispatch();
  //TODO: Change name from notifications to something clearer.
  const snackbarNotifications = useSelector((store: RootState) => store.snackbarNotifications || []);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  
  const storeDisplayed = (id: SnackbarKey) => {
    displayed = [...displayed, id];
  };

  const removeDisplayed = (id: SnackbarKey) => {
    displayed = [...displayed.filter(key => id !== key)];
  };

  useEffect(() => {
    snackbarNotifications.forEach((notification) => {
      if (notification.dismissed) {
        // dismiss snackbar using notistack
        closeSnackbar(notification.key);
        dispatch(reduxCloseSnackbar(notification.key));
        return;
      }

      // do nothing if snackbar is already displayed
      if (displayed.includes(notification.key)) return;

      // display snackbar using notistack
      enqueueSnackbar(notification.message, {
        key: notification.key,
        ...notification.options,
        onClose: (event, reason, myKey) => {
          if (notification.options.onClose) {
            notification.options.onClose(event, reason, myKey);
          }
        },
        onExited: (event, myKey) => {
          // remove this snackbar from redux store
          dispatch(reduxRemoveSnackbar(myKey));
          removeDisplayed(myKey);
        },
      });

      // keep track of snackbars that we've displayed
      storeDisplayed(notification.key);
    });
  }, [snackbarNotifications, closeSnackbar, enqueueSnackbar, dispatch]);

  return null;
};

export default Notifier;