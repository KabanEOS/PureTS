import { batch } from 'react-redux';

import { reduxEnqueueSnackbar } from 'framework/snackbars/redux/action.creator';
import { SnackbarNotification } from 'framework/snackbars/redux/snackbar.reducer';
import store from 'redux/store';
import { getSystemNotificationsForUser, groupSystemNotificationsByContext, updateManySystemNotifications, updateSystemNotification } from 'shared/helpers/systemNotification.helper';

import { NotificationStatus } from '../models/systemNotification.enums';

import { SystemNotification } from '../models/systemNotification.model';

import { reduxAddSystemNotification, reduxRemoveSystemNotification, reduxSyncSystemNotificationGroups, reduxSyncSystemNotifications, reduxUpdateSystemNotificationGroup, reduxUpdateSystemNotificationStatus } from '../redux/action.creator';

export const getSystemNotificationsForNavbar = async (): Promise<void> => {
  const notifs = await getSystemNotificationsForUser();
  const newNotifs = notifs.filter(n => n.status === NotificationStatus.New);
  if (newNotifs && newNotifs.length > 0) {
    batch(() => {
      store.dispatch(reduxSyncSystemNotifications(newNotifs));
      store.dispatch(reduxSyncSystemNotificationGroups(groupSystemNotificationsByContext(newNotifs)));
    });
  }
};

export const addSystemNotification = async (notif: SystemNotification): Promise<void> => {
  store.dispatch(reduxAddSystemNotification(notif));
  
  if (!store.getState().user?.preferredSettings.systemNotificationsActive) return;

  const snackbarObj: SnackbarNotification = {
    message: notif.message,
    options: {
      key: notif.id,
      variant: 'info',
    },
    key: notif.id,
  };
  store.dispatch(reduxEnqueueSnackbar(snackbarObj));
};

// TODO: UNUSED.
export const removeSystemNotification = async (notifId: string): Promise<void> => {
  store.dispatch(reduxRemoveSystemNotification(notifId));
};

// TODO: UNUSED. TO USE WITH REMOVAL
export const updateNotificationStatus = async (
  notif: SystemNotification,
  status: NotificationStatus
): Promise<void> => {
  store.dispatch(reduxUpdateSystemNotificationStatus(notif.id, status));
  updateSystemNotification({ ...notif, status });
};

export const updateNotificationGroupStatus = async (
  groupId: string,
  status: NotificationStatus
): Promise<void> => {
  const notifGroup = store.getState().systemNotifications.notificationGroups.find(ng => ng.groupId === groupId);

  if (!notifGroup) return;
  
  const notifIds = notifGroup.notifications.map(n => n.id);
  store.dispatch(reduxUpdateSystemNotificationGroup(groupId, status));
  updateManySystemNotifications(notifIds, { status });
};