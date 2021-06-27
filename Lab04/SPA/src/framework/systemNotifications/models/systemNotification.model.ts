import { NotificationPriority, NotificationStatus, NotificationType } from './systemNotification.enums';

export interface NotificationMetaData {
  discussionId?: number;
  thesisId?: string;
  hasRedirect?: boolean;
  count?: number;
}

export interface SystemNotification {
  id: string;
  /** Priority/Importance of notification */
  priority: NotificationPriority;

  /** Status of the notification */
  status: NotificationStatus;

  /** Type of notification */
  type: NotificationType;

  /** Notification Title */
  title: string;

  /** Notification Message */
  message: string;

  /** Date notification was created */
  whenCreated: Date;

  /** Date notification was updated */
  whenUpdated: Date;

  /** Metadata that contains useful information for redirects and grouping */
  metadata: NotificationMetaData;
}

export interface SystemNotificationAPI extends SystemNotification {
  /** A reference to the user the notification is for */
  userId: string;
}

export interface SystemNotificationGroup {
  /** Generated ID used only in frontend */
  groupId: string;
  /** Notifications in group */
  notifications: SystemNotification[];

  /** Priority/Importance of notification */
  priority: NotificationPriority;

  /** Status of the notification */
  status: NotificationStatus;

  /** Type of notification */
  type: NotificationType;

  /** Notification Message */
  message?: string;

  /** Metadata about the notification group */
  metadata: NotificationMetaData;
}

export const mapSystemNotificationAPIToSystemNotification = (notif: SystemNotificationAPI): SystemNotification => {
  return {
    id: notif.id,
    priority: notif.priority,
    message: notif.message,
    status: notif.status,
    title: notif.title,
    type: notif.type,
    whenCreated: notif.whenCreated,
    whenUpdated: notif.whenUpdated,
    metadata: notif.metadata
  };
};