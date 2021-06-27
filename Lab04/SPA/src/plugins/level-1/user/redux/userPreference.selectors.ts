import { createSelector } from 'reselect';

import { UserProfile } from 'plugins/level-1/user/models/userProfile.model';
import { RootState } from 'redux/models/root.state';

const userSelector = (state: RootState): UserProfile | null => state.user;

export const selectSystemNotificationsActive = createSelector(
  [userSelector], 
  user => user?.preferredSettings.systemNotificationsActive
);

export const selectSlackbotNotificationsActive = createSelector(
  [userSelector], 
  user => user?.preferredSettings.slackBotNotificationsActive
);