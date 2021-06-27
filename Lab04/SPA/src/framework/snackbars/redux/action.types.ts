import { ActionEnum } from './action.enums';

import { SnackbarNotification } from './snackbar.reducer';

export interface EnqueueSnackbar {
  type: ActionEnum.ENQUEUE_SNACKBAR;
  notification: SnackbarNotification;
}

export interface RemoveSnackbar {
  type: ActionEnum.REMOVE_SNACKBAR;
  key: any;
}

export interface CloseSnackbar {
  type: ActionEnum.CLOSE_SNACKBAR;
  dismissAll: any;
  key: any;
}

export type SnackbarActionType =
  | EnqueueSnackbar
  | CloseSnackbar
  | RemoveSnackbar