import { UserRole, UserRoleConverted } from 'framework/auth/models/role.enum';

export const setUserRole = (appRoleId: string): UserRole => {
  let role: string;
  for (const [key, value] of Object.entries(UserRoleConverted)) {
    if (value === appRoleId) role = key;
  }
  const assignedRole = UserRole[role];
  return assignedRole;
};