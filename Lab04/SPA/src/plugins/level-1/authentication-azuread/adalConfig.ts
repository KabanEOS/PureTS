import * as msal from '@azure/msal-browser';
import 'regenerator-runtime';
import { isIE, isEdge } from 'react-device-detect';

export const API_RESOURCE_SCOPE = 'c5f75801-a044-4cec-9bcd-7479567b20d3/user_impersonation';

export const authConfig: msal.Configuration = {
  auth: {
    authority: 'https://login.microsoftonline.com/b5e4f771-c0c7-4e37-90f6-d55402b5c172',
    clientId: 'ec8a84a4-5230-496a-b6ed-ccc13cb09864',
    redirectUri: process.env.REACT_APP_URL,
    postLogoutRedirectUri: process.env.REACT_APP_URL, 
  }, 
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: isIE || isEdge, 
  },
};

export const graphScopes = ['openid', 'profile', 'User.Read'];

export const apiScopes = [API_RESOURCE_SCOPE];