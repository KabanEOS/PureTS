import { NotificationStatus } from '../models/systemNotification.enums';
import { SystemNotification, SystemNotificationGroup } from '../models/systemNotification.model';

import { ActionEnum } from './action.enums';

export interface SyncNotifications {
  type: ActionEnum.SYNC_NOTIFICATIONS;
  notifications: SystemNotification[];
}

export interface AddSystemNotification {
  type: ActionEnum.ADD_NOTIFICATION;
  notification: SystemNotification;
}

export interface RemoveSystemNotification {
  type: ActionEnum.REMOVE_NOTIFICATION;
  notificationId: string;
}

export interface UpdateSystemNotificationStatus {
  type: ActionEnum.UPDATE_NOTIFICATION_STATUS;
  notificationId: string;
  status: NotificationStatus;
}

// GROUPS

export interface SyncSystemNotificationGroups {
  type: ActionEnum.SYNC_NOTIFICATION_GROUPS;
  notificationGroups: SystemNotificationGroup[];
}

export interface AddSystemNotificationGroup {
  type: ActionEnum.ADD_NOTIFICATION_GROUP;
  notificationGroup: SystemNotificationGroup;
}

export interface UpdateSystemNotificationGroupStatus {
  type: ActionEnum.UPDATE_NOTIFICATION_GROUP;
  notificationGroupId: string;
  status: NotificationStatus;
}

export interface RemoveSystemNotificationGroup {
  type: ActionEnum.REMOVE_NOTIFICATION_GROUP;
  notificationGroupId: string;
}

export type SystemNotificationActionType =
  | SyncNotifications
  | AddSystemNotification
  | RemoveSystemNotification
  | UpdateSystemNotificationStatus
  //
  | SyncSystemNotificationGroups
  | AddSystemNotificationGroup
  | UpdateSystemNotificationGroupStatus
  | RemoveSystemNotificationGroup