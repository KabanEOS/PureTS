import { IBaseModelAttached } from 'models/abstraction/base.interface';

import { UserStatus } from './user.status';
//import { IUserSettings } from './userSettings.model';

export interface IUser {  
  /** Azure AD's user ID. Empty when user is invited through custom link. */
  aadUserId?: string;

  /** User's email. Assigned only when user is invited through custom link. */
  email?: string;
  
  /** User's display name. Assigned only when user is invited through custom link. */
  displayName?: string;
  
  /** Last login date. Empty value means user has not logged in before. */
  lastLoggedIn?: Date;

  /* Preferred user's settings about application main features. */
  //preferredSettings: IUserSettings;

  /* User's status. */
  status: UserStatus;
}

export type IUserAttached = IUser & IBaseModelAttached;
