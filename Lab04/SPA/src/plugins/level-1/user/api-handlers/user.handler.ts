import { adalApiPut, adalApiGet } from 'framework/helpers/axios.methods';

import { UserProfile } from '../models/userProfile.model';
import { UserSettings } from '../models/userSettings.model';

import { mapUserProfileFromApiToUserProfile, UserProfileFromApi } from './login.handler';

import { URL_GET_CURRENT_USER, URL_USER_SETTINGS } from './url/url.helper';

export const getCurrentUser = async (): Promise<UserProfile> => {
  const response = await adalApiGet<UserProfileFromApi>(URL_GET_CURRENT_USER);
  
  return mapUserProfileFromApiToUserProfile(response.data);
};

export const saveUserSettings = async (settings: Partial<UserSettings>): Promise<void> => {
  await adalApiPut<{ settings: Partial<UserSettings> }, void>(URL_USER_SETTINGS, { settings });
};