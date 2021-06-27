import { UserSettings } from './userSettings.model';

export class UserProfile {
  public constructor(
    dbUserId: string,
    aadUserId: string | undefined,
    upn: string, 
    name: string, 
    roles: string[], 
    preferredSettings: UserSettings,
    lastLoggedIn?: Date,
    email?: string,
  ) {
    this.aadUserId = aadUserId;
    this.dbUserId = dbUserId;
    this.name = name;
    this.upn = upn;
    this.roles = roles;
    this.preferredSettings = preferredSettings;
    this.lastLoggedIn = lastLoggedIn;
    this.email = email;
  }

  /** Mongo id. */
  dbUserId: string;

  /** Azure AD's id. */
  aadUserId: string | undefined;

  /** User principal name (e-mail). */
  upn: string;

  /** User's full name. */
  name: string;

  /** User role. */
  roles: string[];

  /** Represents preferred user settings. */
  preferredSettings: UserSettings;

  /** User's last login date. */
  lastLoggedIn?: Date;

  /** User email, if provided */
  email?: string;

  hasAnyOfTheRoles = (...rolesToFind: string[]): boolean => {
    //before we decide what are the appliation roles 
    return true;

    // for (const role of rolesToFind) {
    //   if (this.roles.indexOf(role) !== -1) 
    //     return true;
    // }

    return false;
  };
}