import { OptionsObject, SnackbarKey } from 'notistack';

import { ActionEnum } from './action.enums';
import { SnackbarActionType } from './action.types';

export interface SnackbarNotification {
  key: SnackbarKey;
  message: string;
  options: OptionsObject;
  dismissed?: boolean;
}

const defaultState: SnackbarNotification[] = [];

export default (
  notifications: SnackbarNotification[] = defaultState, action: SnackbarActionType
): SnackbarNotification[] => {
  switch (action.type) {
    case ActionEnum.ENQUEUE_SNACKBAR:
      return [ ...notifications, action.notification];

    case ActionEnum.REMOVE_SNACKBAR:
      return notifications.filter(
        notification => notification.key !== action.key,
      );
      
    case ActionEnum.CLOSE_SNACKBAR:
      return notifications.map(notification => (
        (action.dismissAll || notification.key === action.key)
          ? { ...notification, dismissed: true }
          : notification
      ));

    default:
      return notifications;
  }
};