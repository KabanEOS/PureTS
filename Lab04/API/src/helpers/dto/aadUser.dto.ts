export interface IAADUser {
  /** Azure AD's ID. */
  id: string;

  /** User's email. */
  userEmail: string;

  /** User's display name. */
  userDisplayName: string;
}