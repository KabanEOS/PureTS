import axios, { AxiosResponse } from 'axios';

// import { useLocation } from 'react-use';

import { apiScopes, graphScopes } from 'plugins/level-1/authentication-azuread/adalConfig';
import { getAccessToken } from 'plugins/level-1/authentication-azuread/authProvider';

/** Temporary workaround because REACT_APP_USE_LOGIN does not work when building widget in Azure. */
const useAuthentication = process.env.REACT_APP_USE_LOGIN === 'true' && process.env.REACT_APP_WIDGET !== 'true' && !window.location?.pathname?.match('widget'); 

export const adalApiGet = async <T>(
  url: string, 
  axiosSettings?: Record<string, unknown>
): Promise<AxiosResponse<T>> => {

  if (useAuthentication) {
    const token = await getAccessToken(apiScopes);
    const headers = { Authorization: `Bearer ${token}` };
    return axios.get<T>(url, { headers, ...axiosSettings });
  }
  
  return axios.get<T>(url, axiosSettings);
};

export const adalApiPut = async <T, K>(url: string, payload: T): Promise<AxiosResponse<K>> => {
  if (useAuthentication) {
    const token = await getAccessToken(apiScopes);
    const headers = { Authorization: `Bearer ${token}` };
    return axios.put<K>(url, payload, { headers });
  }

  return axios.put<K>(url, payload);
};

export const adalApiPost = async <T, K>(url: string, payload: T): Promise<AxiosResponse<K>> => {
  if (useAuthentication) {
    const token = await getAccessToken(apiScopes);
    const headers = { Authorization: `Bearer ${token}` };
    return axios.post<K>(url, payload, { headers });
  }

  return axios.post<K>(url, payload);
};

export const adalApiDelete = async <T>(url: string): Promise<AxiosResponse<T>> => {
  if (useAuthentication) {
    const token = await getAccessToken(apiScopes);
    const headers = { Authorization: `Bearer ${token}` };
    return axios.delete<T>(url, { headers });
  }
  
  return axios.delete<T>(url);
};

///////////////////////////////////////////////////////////////////////////////////////////////////////

/** Fetch data from Microsoft Graph API */
export const adalGraphGet = async <T>(
  url: string, 
  axiosSettings?: Record<string, unknown>
): Promise<AxiosResponse<T>> => {

  if (useAuthentication) {
    const token = await getAccessToken(graphScopes);
    const headers = { Authorization: `Bearer ${token}` };
    return axios.get<T>(url, { headers, ...axiosSettings });
  }
  
  return axios.get<T>(url);
};

/** Post data to Microsoft Graph API */
export const adalGraphPost = async <T, K>(url: string, payload: T): Promise<AxiosResponse<K>> => {
  if (useAuthentication) {
    const token = await getAccessToken(graphScopes);
    const headers = { Authorization: `Bearer ${token}` };
    return axios.post<K>(url, payload, { headers });
  }
  
  return axios.post<K>(url, payload);
};