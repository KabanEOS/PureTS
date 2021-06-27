
export type ICurrentUser = {
  /** User's DB Id. */
  id?: string;

  /** Azure AD's Id. */
  aadUserId: string | undefined;

  /** User's email. Used for sending emails from back-end to end user. */
  email: string; //commented out for now

  /** Display name of the user.  Used for sending emails from back-end to end user. */
  displayName?: string; //commented out for now

  /** User roles. */
  roles: string[];

  /** Returns true when user has any of the provider roles. */
  hasAnyOfTheRoles: (...userRoles: string[]) => boolean;
} 

export class CurrentUser implements ICurrentUser {
  constructor(
    id: string, 
    aadUserId: string | undefined, 
    email: string, 
    displayName: string,
    roles: string[]
  ) {
    this.id = id;
    this.aadUserId = aadUserId;
    this.email = email;
    this.displayName = displayName;
    this.roles = roles;
  }

  id: string;
  aadUserId: string;
  email: string;
  displayName: string;
  roles: string[];

  hasAnyOfTheRoles = (...userRoles: string[]): boolean => {
    for (const role of userRoles) {
      if (this.roles?.indexOf(role) !== -1) 
        return true;
    }

    return false;
  };
}