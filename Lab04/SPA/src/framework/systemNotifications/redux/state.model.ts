import { SystemNotification, SystemNotificationGroup } from '../models/systemNotification.model';

export interface SystemNotificationState {
  notifications: SystemNotification[];
  notificationGroups: SystemNotificationGroup[];
};

export const defaultSystemNotificationState = {
  notifications: [] as SystemNotification[],
  notificationGroups: [] as SystemNotificationGroup[]
};