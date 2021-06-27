
import { createSelector } from 'reselect';

import { UserProfile } from 'plugins/level-1/user/models/userProfile.model';
import { RootState } from 'redux/models/root.state';

import { UserRole } from '../models/user.roles';

const userSelector = (state: RootState): UserProfile | null => state.user;

export const selectIsScreen = createSelector(
  [userSelector], 
  user => !user ? false : user.hasAnyOfTheRoles( 
    UserRole.Screen
  )
);

export const isStandardUser = (user: UserProfile | null): boolean => (
  !user ? false : user.hasAnyOfTheRoles( 
    UserRole.StandardUser
  )
);

export const selectIsStandardUser = createSelector(
  [userSelector], 
  user => isStandardUser(user)
);

export const isExternalModerator = (user: UserProfile | null): boolean => (
  !user ? false : user.hasAnyOfTheRoles(
    UserRole.ExternalModerator, 
    UserRole.InternalModerator, 
    UserRole.GlobalAdministrator
  )
);

export const selectIsExternalModerator = createSelector(
  [userSelector], 
  user => isExternalModerator(user)
);

export const isInternalModerator = (user: UserProfile | null): boolean => (
  !user ? false : user.hasAnyOfTheRoles(
    UserRole.InternalModerator, 
    UserRole.GlobalAdministrator
  )
);

export const selectIsInternalModerator = createSelector(
  [userSelector], 
  user => isInternalModerator(user)
);

export const isAdmin = (user: UserProfile | null): boolean => (
  !user ? false : user.hasAnyOfTheRoles(
    UserRole.GlobalAdministrator
  )
);

export const selectIsAdmin = createSelector(
  [userSelector], 
  user => isAdmin(user)
);