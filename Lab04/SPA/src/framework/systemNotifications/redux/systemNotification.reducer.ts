import { ActionEnum } from './action.enums';
import { SystemNotificationActionType } from './action.types';
import { SystemNotificationState, defaultSystemNotificationState } from './state.model';
import { addSystemNotificationHelper, removeSystemNotificationHelper, syncSystemNotificationsHelper, updateSystemNotificationGroupHelper, updateSystemNotificationStatusHelper } from './systemNotification.helper';

const systemNotifications = (
  state: SystemNotificationState = defaultSystemNotificationState,
  action: SystemNotificationActionType
): SystemNotificationState => {
  switch (action.type) {
    case ActionEnum.SYNC_NOTIFICATIONS:
      return syncSystemNotificationsHelper(state, action.notifications);
    //
    case ActionEnum.ADD_NOTIFICATION:
      return addSystemNotificationHelper(state, action.notification);
    //
    case ActionEnum.REMOVE_NOTIFICATION:
      return removeSystemNotificationHelper(state, action.notificationId);
    //
    case ActionEnum.UPDATE_NOTIFICATION_STATUS:
      return updateSystemNotificationStatusHelper(state, action.notificationId, action.status);
    //
    case ActionEnum.SYNC_NOTIFICATION_GROUPS: 
      return { ...state, notificationGroups: action.notificationGroups };
    //
    case ActionEnum.UPDATE_NOTIFICATION_GROUP:
      return updateSystemNotificationGroupHelper(state, action.notificationGroupId, action.status);
    default: 
      return state;
  }
};
  
export default systemNotifications;