
import { GlobalTheme } from 'models/graph/theme.model';

import { UserProfile } from '../models/userProfile.model';
import { UserSettings } from '../models/userSettings.model';

import { ActionEnum } from './action.enums';
import * as UserActionType from './action.types';

export const reduxSyncUserData = (userData: UserProfile): UserActionType.SyncUserData => {
  return {
    type: ActionEnum.SYNC_USER_DATA,
    userData
  };
};

export const reduxSwitchUserTheme = (theme: GlobalTheme): UserActionType.SwitchUserTheme => {
  return {
    type: ActionEnum.SWITCH_USER_THEME,
    theme
  };
};

export const reduxClearUserDataAfterLogout = (): UserActionType.ClearUserDataAfterLogout => {
  return {
    type: ActionEnum.CLEAR_USER_DATA_AFTER_LOGOUT
  };
};

export const reduxUpdateUserSettings = (preferredSettings: UserSettings): UserActionType.UpdateUserSettings => {
  return {
    type: ActionEnum.UPDATE_USER_SETTINGS,
    preferredSettings
  };
};