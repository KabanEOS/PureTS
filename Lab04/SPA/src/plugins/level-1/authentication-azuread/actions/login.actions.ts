import { GlobalTheme } from 'models/graph/theme.model';

import { updateLastLoginDate } from 'plugins/level-1/user/api-handlers/login.handler';
import { getCurrentUser } from 'plugins/level-1/user/api-handlers/user.handler';
import { UserProfile } from 'plugins/level-1/user/models/userProfile.model';
import { reduxSyncUserData, reduxClearUserDataAfterLogout } from 'plugins/level-1/user/redux/action.creator';
import store from 'redux/store';

import authProvider from '../authProvider';

export const syncUserData = async (finishedLogging: boolean, idTokenClaims: { [key: string]: string }
): Promise<UserProfile> => { 
  //complete login and get user profile from database
  const dbUser = finishedLogging 
    ? await updateLastLoginDate() 
    : await getCurrentUser();
  
  if (!Object.keys(dbUser).length) throw new Error('user is missing');

  if (dbUser.aadUserId !== idTokenClaims['oid']) {
    // eslint-disable-next-line no-console
    console.warn('An authenticated user AAD id different from the value in the database.');
  }

  //check if user has a theme in preferredSettings, and if not default the theme to regular
  if (dbUser.preferredSettings && dbUser.preferredSettings.theme === undefined) {
    dbUser.preferredSettings.theme = GlobalTheme.Regular;
  }
  
  //to avoid persisting personal data in database, copy personal data from in-memory auth. token 
  const userProfile = new UserProfile( 
    dbUser.dbUserId,
    idTokenClaims['oid'],
    dbUser?.email || idTokenClaims['preferred_username'], 
    idTokenClaims['name'], 
    idTokenClaims['roles'] as unknown as string[],
    dbUser?.preferredSettings || { languageIso: 'pl' , theme: 'swarmLight', systemNotificationsActive: true, slackBotNotificationsActive: true },
    dbUser?.lastLoggedIn
  );

  store.dispatch(reduxSyncUserData(userProfile));

  return userProfile;
};

export const logoutHandler = (): void => {
  authProvider.logout();
  store.dispatch(reduxClearUserDataAfterLogout());
};