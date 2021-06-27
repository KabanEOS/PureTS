import { SnackbarActionType } from 'framework/snackbars/redux/action.types';
import { SystemNotificationActionType } from 'framework/systemNotifications/redux/action.types';
import { ScrumTableActionType } from 'pages/ScrumTablePage/redux/action.types';
import { AzureAdActionType } from 'plugins/level-1/authentication-azuread/redux/action.types';
import { UserActionType } from 'plugins/level-1/user/redux/action.types';

import { GlobalActionType } from './global/action.types';

export type ActionType = 
  | UserActionType
  | AzureAdActionType
  | SystemNotificationActionType
  | GlobalActionType
  | SnackbarActionType
  | ScrumTableActionType
