import { ActionEnum } from './action.enums';
import * as SnackbarActionType from './action.types';
import { SnackbarNotification } from './snackbar.reducer';

export const reduxEnqueueSnackbar = (notification: SnackbarNotification): SnackbarActionType.EnqueueSnackbar => {
  const key = notification.options && notification.options.key;

  return {
    type: ActionEnum.ENQUEUE_SNACKBAR,
    notification: {
      ...notification,
      key: key || new Date().getTime() + Math.random(),
    },
  };
};

export const reduxRemoveSnackbar = (key: string | number): SnackbarActionType.RemoveSnackbar => ({
  type: ActionEnum.REMOVE_SNACKBAR,
  key,
});

export const reduxCloseSnackbar = (key?: string | number): SnackbarActionType.CloseSnackbar => ({
  type: ActionEnum.CLOSE_SNACKBAR,
  dismissAll: !key, // dismiss all if no key has been defined
  key,
});