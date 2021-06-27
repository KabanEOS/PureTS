import { adalGraphGet } from 'framework/helpers/axios.methods';
import store from 'redux/store';

import { AADUserProfile, AADUserProfileResponse, AADUserProfileFilterResponse } from '../models/aadUserProfile.model';
import { reduxSyncOrganizationalUsers } from '../redux/action.creator';

export const GRAPH_API_ENDPOINT = 'https://graph.microsoft.com/beta/';
export const GRAPH_API_USERS_ENDPOINT = GRAPH_API_ENDPOINT + 'users';

export const getAzureAdUserById = async (userId: string): Promise<AADUserProfile | null> => {
  const axiosSettings = { validateStatus: false };
  const response = await adalGraphGet<AADUserProfileResponse>(GRAPH_API_USERS_ENDPOINT + '/' + userId, axiosSettings);
  return response.status === 200 ? response.data.value : null;
};

export const getAzureAdUsers = async (): Promise<void> => {
  const axiosSettings = { validateStatus: false };
  let response = await adalGraphGet<AADUserProfileFilterResponse>(GRAPH_API_USERS_ENDPOINT, axiosSettings);
  let users: AADUserProfile[] = response.data?.value ? [...response.data?.value] : [];
  const organizationalUsers: string[] = []; 

  while (response.data['@odata.nextLink']) {
    response = await adalGraphGet<AADUserProfileFilterResponse>(response.data['@odata.nextLink'], axiosSettings);
    if (response.data?.value) users = [...users, ...response.data?.value];
  }

  for (const user in users) {
    const organizationalUser = users[user].mail 
      ? users[user].mail
      : users[user].userPrincipalName;
    organizationalUsers.push(organizationalUser);
  }

  if (organizationalUsers.length > 0) store.dispatch(reduxSyncOrganizationalUsers(organizationalUsers));
};
  
export const getAzureAdUserByMail = async (email: string): Promise<AADUserProfile | null> => {
  const axiosSettings = { validateStatus: false, responseType: 'arraybuffer' };
  const response = await adalGraphGet<AADUserProfileFilterResponse>(GRAPH_API_USERS_ENDPOINT + `?$filter=mail eq '${email}'`, axiosSettings);
  return response.status === 200 && response.data.value ? response.data.value[0] : null;
};

export const getCurrentUserAzureAdPhoto = async (): Promise<Blob> => {
  const axiosSettings = { validateStatus: false };
  const response = await adalGraphGet<Blob>(GRAPH_API_ENDPOINT + 'me/photo/$value', { ...axiosSettings, responseType: 'blob' });
  return response.data;
};