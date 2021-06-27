import isEqual from 'lodash/isEqual';
import nextId from 'react-id-generator';

import { SystemNotification } from 'framework/systemNotifications/models/systemNotification.model';

import { NotificationStatus, NotificationType } from '../models/systemNotification.enums';

import { SystemNotificationState } from './state.model';

//TODO: Check if necesarry to use at the end of each method
const filterSystemNotificationsHelper = (notifications: SystemNotification[]): SystemNotification[] => {
  const newNotifs = notifications.filter(
    n => n.status === NotificationStatus.New || n.status === NotificationStatus.Read
  );

  return newNotifs;
};

export const syncSystemNotificationsHelper = (
  state: SystemNotificationState,
  notifications: SystemNotification[]
): SystemNotificationState => {
  return { ...state, notifications: filterSystemNotificationsHelper(notifications) };
};

export const addSystemNotificationHelper = (
  state: SystemNotificationState,
  notification: SystemNotification
): SystemNotificationState => {
  const tempNotifs = [ ...state.notifications ];
  tempNotifs.push(notification);

  const tempGroups = [ ...state.notificationGroups ];

  let addedToGroup = false;

  //TODO: add fail fast
  tempGroups.forEach(group => {
    if (group.type === NotificationType.NewArgumentInModDiscussion &&
        group.type === notification.type &&
        notification.metadata.discussionId === group.metadata.discussionId ||
        group.type === notification.type && isEqual(notification.metadata, group.metadata)
    ) {
      group.notifications.push(notification);
      group.status = NotificationStatus.New;
      addedToGroup = true;
    }
  });

  if (!addedToGroup) {
    tempGroups.push({
      metadata: notification.metadata,
      groupId: nextId(),
      notifications: [notification],
      priority: notification.priority,
      status: notification.status,
      type: notification.type
    });
  }

  return { ...state, notifications: filterSystemNotificationsHelper(tempNotifs), notificationGroups: tempGroups };
};

export const removeSystemNotificationHelper = (
  state: SystemNotificationState,
  notificationId: string
): SystemNotificationState => {
  const tempNotifs = [ ...state.notifications ];
  tempNotifs.filter(n => n.id !== notificationId);
  return { ...state, notifications: filterSystemNotificationsHelper(tempNotifs) };
};

export const updateSystemNotificationStatusHelper = (
  state: SystemNotificationState,
  notificationId: string,
  status: NotificationStatus
): SystemNotificationState => {
  let tempNotifs = [ ...state.notifications ];

  //TODO replace with find
  tempNotifs = tempNotifs.map(n => {
    if (n.id === notificationId) {
      n.status = status;
    }
    return n;
  });

  return { ...state, notifications: filterSystemNotificationsHelper(tempNotifs) };
};

export const updateSystemNotificationGroupHelper = (
  state: SystemNotificationState,
  notificationGroupId: string,
  status: NotificationStatus
): SystemNotificationState => {
  const tempGroups = [ ...state.notificationGroups ];
  const tempGroup = tempGroups.find(tG => tG.groupId === notificationGroupId);

  if (!tempGroup) return state;

  const newTempGroups = tempGroups.filter(tG => tG.groupId !== tempGroup.groupId);
  tempGroup.status = status;

  return { ...state, notificationGroups: [ ...newTempGroups, tempGroup ] };
};