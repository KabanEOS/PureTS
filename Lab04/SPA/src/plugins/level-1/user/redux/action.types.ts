
import { GlobalTheme } from 'models/graph/theme.model';

import { UserProfile } from '../models/userProfile.model';
import { UserSettings } from '../models/userSettings.model';

import { ActionEnum } from './action.enums';

export interface SyncUserData {
  type: ActionEnum.SYNC_USER_DATA;
  userData: UserProfile;
}

export interface SwitchUserTheme {
  type: ActionEnum.SWITCH_USER_THEME;
  theme: GlobalTheme;
}

export interface ClearUserDataAfterLogout {
  type: ActionEnum.CLEAR_USER_DATA_AFTER_LOGOUT;
}

export interface UpdateUserSettings {
  type: ActionEnum.UPDATE_USER_SETTINGS;
  preferredSettings: UserSettings;
}

export type UserActionType = 
  | SyncUserData
  | SwitchUserTheme
  | ClearUserDataAfterLogout
  | UpdateUserSettings