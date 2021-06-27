import * as msal from '@azure/msal-browser';

import { MsalToken } from '../models/msalToken.model';

/** 
 * Retrieves cached Id Token claims from session storage.
 * If cached token account id differs from provided one, returns undefined.
 */
export const getIdTokenFromSessionStorage = (account: msal.AccountInfo
): { [key: string]: string } => {
  const sessionStorageKey = Object.keys(sessionStorage).find(k => k.indexOf('-idtoken-') !== -1);
  if (!sessionStorageKey) return {};

  const storedSessionObjectString = sessionStorage.getItem(sessionStorageKey);
  if (!storedSessionObjectString) return {};

  const storedMsalToken = JSON.parse(storedSessionObjectString) as MsalToken;
  if (!storedMsalToken || !storedMsalToken.secret) return {};

  if (storedMsalToken.homeAccountId !== account.homeAccountId) return {}; //different user
  if (parseInt(storedMsalToken.expiresOn) < Date.now() / 1000) return {}; //token expired

  const idToken = storedMsalToken.secret;

  const idTokenParts = idToken.split('.');
  if (idTokenParts.length !== 3) return {};

  const decodedClaims = Buffer.from(idTokenParts[1], 'base64').toString();
  if (!decodedClaims) return {};

  const claims = JSON.parse(decodedClaims) as { [key: string]: string };
  return claims;
};

/** 
 * Retrieves cached Access Token from session storage. Searches by target (audience), since there may be for than 1 access token stored. 
 * If cached token account id differs from provided one, returns undefined.
 * NOTE: This method is a little costly performance wise, and can be helped with caching access token in-memory.
 */
export const getAccessTokenFromSessionStorage = (account: msal.AccountInfo, targetIncluding: string
): string | undefined => {
  const sessionStorageKey = Object.keys(sessionStorage).find(k => k.indexOf('-accesstoken-') !== -1 && k.indexOf(targetIncluding) !== -1);
  if (!sessionStorageKey) return undefined;

  const storedSessionObjectString = sessionStorage.getItem(sessionStorageKey);
  if (!storedSessionObjectString) return undefined;

  const storedMsalToken = JSON.parse(storedSessionObjectString) as MsalToken;
  if (!storedMsalToken || !storedMsalToken.secret) return undefined;

  if (storedMsalToken.homeAccountId !== account.homeAccountId) return undefined; //different user
  if (parseInt(storedMsalToken.expiresOn) < Date.now() / 1000) return undefined; //token expired

  const accessToken = storedMsalToken.secret;
  return accessToken;
};
