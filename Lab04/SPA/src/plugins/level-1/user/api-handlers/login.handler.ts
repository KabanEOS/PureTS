
import { adalApiGet, adalApiPut } from 'framework/helpers/axios.methods';

import { UserProfile } from '../models/userProfile.model';

import { URL_GET_CURRENT_USER, URL_UPDATE_LAST_LOGGED_IN } from './url/url.helper';

export type UserProfileFromApi = Omit<UserProfile, 'dbUserId'> & {id: string}

export const mapUserProfileFromApiToUserProfile = (fromApi: UserProfileFromApi): UserProfile => {
  return {
    ...fromApi,
    dbUserId: fromApi.id
  };
};

export const getCurrentUser = async (): Promise<UserProfile> => {
  const response = await adalApiGet<UserProfileFromApi>(URL_GET_CURRENT_USER);

  const mappedUser: UserProfile = mapUserProfileFromApiToUserProfile({
    ...response.data,
    preferredSettings: {
      languageIso: response.data.preferredSettings.languageIso,
      theme: response.data.preferredSettings.theme,
      slackBotNotificationsActive: response.data.preferredSettings.slackBotNotificationsActive,
      systemNotificationsActive: response.data.preferredSettings.systemNotificationsActive
    }
  });

  return mappedUser;
};

export const updateLastLoginDate = async (): Promise<UserProfile> => {

  const response = await adalApiPut<Record<string, unknown>, UserProfileFromApi>(URL_UPDATE_LAST_LOGGED_IN, {});

  return mapUserProfileFromApiToUserProfile(response.data);
};