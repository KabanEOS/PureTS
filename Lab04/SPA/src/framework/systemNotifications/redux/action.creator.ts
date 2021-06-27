import { NotificationStatus } from '../models/systemNotification.enums';
import { SystemNotification, SystemNotificationGroup } from '../models/systemNotification.model';

import { ActionEnum } from './action.enums';
import * as SystemNotificationActionType from './action.types';

export const reduxSyncSystemNotifications = (
  notifications: SystemNotification[]
): SystemNotificationActionType.SyncNotifications => {
  return {
    type: ActionEnum.SYNC_NOTIFICATIONS,
    notifications
  };
};

export const reduxAddSystemNotification = (
  notification: SystemNotification
): SystemNotificationActionType.AddSystemNotification => {
  return {
    type: ActionEnum.ADD_NOTIFICATION,
    notification
  };
};

export const reduxRemoveSystemNotification = (
  notificationId: string
): SystemNotificationActionType.RemoveSystemNotification => {
  return {
    type: ActionEnum.REMOVE_NOTIFICATION,
    notificationId
  };
};

export const reduxUpdateSystemNotificationStatus = (
  notificationId: string,
  status: NotificationStatus
): SystemNotificationActionType.UpdateSystemNotificationStatus => {
  return {
    type: ActionEnum.UPDATE_NOTIFICATION_STATUS,
    notificationId,
    status
  };
};

// GROUPS
export const reduxSyncSystemNotificationGroups = (
  notificationGroups: SystemNotificationGroup[]
): SystemNotificationActionType.SyncSystemNotificationGroups => {
  return {
    type: ActionEnum.SYNC_NOTIFICATION_GROUPS,
    notificationGroups
  };
};

export const reduxAddSystemNotificationGroup = (
  notificationGroup: SystemNotificationGroup
): SystemNotificationActionType.AddSystemNotificationGroup => {
  return {
    type: ActionEnum.ADD_NOTIFICATION_GROUP,
    notificationGroup
  };
};

export const reduxRemoveSystemNotificationGroup = (
  notificationGroupId: string
): SystemNotificationActionType.RemoveSystemNotificationGroup => {
  return {
    type: ActionEnum.REMOVE_NOTIFICATION_GROUP,
    notificationGroupId
  };
};

export const reduxUpdateSystemNotificationGroup = (
  notificationGroupId: string,
  status: NotificationStatus
): SystemNotificationActionType.UpdateSystemNotificationGroupStatus => {
  return {
    type: ActionEnum.UPDATE_NOTIFICATION_GROUP,
    notificationGroupId,
    status
  };
};