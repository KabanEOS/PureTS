export class UserProfile {
  constructor(name, upn, roles, preferredSettings) {
    this.name = name;
    this.upn = upn;
    this.roles = roles;
    this.preferredSettings = preferredSettings;
    this.hasAnyOfTheRoles = (...userRoles) => {
      for (const role of userRoles) {
        if (this.roles.indexOf(role) !== -1) 
          return true;
      }
  
      return false;
    };
  }
}