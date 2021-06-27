/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-console */
import * as msal from '@azure/msal-browser';
import { InteractionRequiredAuthError } from '@azure/msal-browser';
import { SilentFlowRequest } from '@azure/msal-common';

import { GlobalTheme } from 'models/graph/theme.model';
import store from 'redux/store';

import { UserRole } from '../authorization/models/user.roles';
import { UserProfile } from '../user/models/userProfile.model';
import { reduxSyncUserData } from '../user/redux/action.creator';

import { syncUserData } from './actions/login.actions';
import { authConfig, graphScopes, apiScopes } from './adalConfig';
import { getIdTokenFromSessionStorage } from './helpers/sessionStorage.helper';

const COOKIE_LAST_LOGIN_ATTEMPT = 'lastLoginAttempt';

const authProvider = new msal.PublicClientApplication(authConfig);

//After user is authenticated, sync user data from database and get language translations.
//Also initiates call to get an access token for Microsoft Graph API - it will be useful later.
authProvider?.handleRedirectPromise().then(async (tokenResponse: any) => {
  if (tokenResponse === null) return;

  const claims = tokenResponse.idTokenClaims;

  await syncUserData(true, claims);
  await getAccessToken(graphScopes);
});

/** 
 * Checks in user has logged in during last 30s. If not, it redirects user to the login page. 
 * TODO: checking for last login date is a temporary workaround
*/
const redirectUserToLoginPage = (
  cookies: { [name: string]: Date },
  setCookie: (cookieName: string, value: Date) => void
): void => {

  const lastLoginAttempt = cookies 
    ? cookies[COOKIE_LAST_LOGIN_ATTEMPT] as Date 
    : undefined;

  //this 30s check disables sending repeated loginRedirect while MSAL library processes temporary authentication code
  //this workaround is considered temporary until Microsoft proposes a final solution for SPA PKCE flow.
  if (!lastLoginAttempt || new Date().getTime() - new Date(lastLoginAttempt).getTime() > 30000) { 
    setCookie(COOKIE_LAST_LOGIN_ATTEMPT, new Date());
    authProvider.loginRedirect({ scopes: apiScopes });
  }
};

/**
 * Logs in current user with Azure AD MSAL 2.0 library using modern PKCE flow.  
 * - If user account is not found, redirects user to IdP. 
 * - If user account is found (cached), but currentUser in Redux is empty -> takes IdToken from session storage and updates Redux state.
 * 
 * Also, retrieves an access token for PV3.API.
 */
export const logInWithAzureAd = async (
  currentUser: UserProfile | null, 
  cookies: { [name: string]: Date }, 
  setCookie: (cookieName: string, value: Date) => void,
  userEmail: string | null, 
  langParam: string, 
  themeParam: GlobalTheme, 
): Promise<void> => {

  const userAccounts = authProvider.getAllAccounts();

  //user is not logged in
  if (!userAccounts || userAccounts.length === 0) {
    if (!userEmail) { //TEMP WORKAROUND!!!
      redirectUserToLoginPage(cookies, setCookie);
      return;
    }
  }

  //user has logged in and is available in Redux
  if (currentUser) return; 
  
  //TEMP WORKAROUND!!!
  if (userEmail) {
    const userProfile = new UserProfile( 
      userEmail,
      undefined,
      userEmail, 
      userEmail, 
      [UserRole.StandardUser],
      { 
        languageIso: langParam, 
        theme: themeParam || GlobalTheme.Regular,
        slackBotNotificationsActive: false,
        systemNotificationsActive: false 
      },
      new Date(), 
      userEmail
    );

    store.dispatch(reduxSyncUserData(userProfile));
    
    return;
  }

  //user has logged but is not available in Redux yet
  const idTokenClaims = getIdTokenFromSessionStorage(userAccounts[0]);

  if (idTokenClaims && idTokenClaims['name']) {
    //get data from claims, set current user in Redux
    await syncUserData(false, idTokenClaims);
    await getAccessToken(graphScopes);
  }
};

/**
 * Gets access token to access Microsoft Graph or API, depending on selected target.  
 * - If user account is not found, retrieves token from IdP. 
 * - If user account is found (cached), tries to retrieve access token from session storage.
 * - If user account is found but not cached, retrieves token from IdP. 
 * 
 * NOTE: The token is first retrieved silently. If that fails, user is redirected to IdP. 
 */
export const getAccessToken = async (scopes: string[]): Promise<string | undefined> => {
  //TEMP WORKAROUND!!!
  const currentUser = store.getState().user;
  if (currentUser?.email && currentUser?.email === currentUser?.dbUserId) {
    //TEMP
    return 'Custom: ' + currentUser?.email;
  }

  const userAccounts = authProvider.getAllAccounts();

  //user is not logged in
  if (!userAccounts || userAccounts.length === 0) {
    authProvider.loginRedirect({ scopes: apiScopes }); 
    return undefined;
  }

  //if access token is available in session storage, return it
  // const cachedAccessToken = getAccessTokenFromSessionStorage(userAccounts[0], scopes[0]);
  // if (cachedAccessToken) return cachedAccessToken;

  const request: SilentFlowRequest = { account: userAccounts[0], scopes };

  try {
    //acquire token silently
    const authResult = await authProvider.acquireTokenSilent(request);
    return authResult.accessToken; 
  }
  catch (error) {
    if (error instanceof InteractionRequiredAuthError) {
      await authProvider.acquireTokenRedirect(request);
    }

    return undefined;
  };
};

export default authProvider as msal.PublicClientApplication;