
import { UserProfile } from '../models/userProfile.model';
import { UserSettings } from '../models/userSettings.model';

import { ActionEnum } from './action.enums';
import { UserActionType } from './action.types';

const defaultUser: UserProfile | null = null;

const user = (state: UserProfile | null = defaultUser, action: UserActionType): UserProfile | null => {
  switch (action.type) {
    case ActionEnum.SYNC_USER_DATA:
      return { ...action.userData };
    //
    case ActionEnum.SWITCH_USER_THEME:
      const updatedPreferredSettings = { ...state?.preferredSettings } as UserSettings;
      updatedPreferredSettings.theme = action.theme;
      return state ? { ...state, preferredSettings: updatedPreferredSettings } : null;
    //
    case ActionEnum.CLEAR_USER_DATA_AFTER_LOGOUT:
      return null;
    //
    case ActionEnum.UPDATE_USER_SETTINGS:
      const tempSettings = action.preferredSettings as UserSettings;
      return state ? { ...state, preferredSettings: tempSettings } : null;
    default: 
		  return state;
  }
};

export default user;