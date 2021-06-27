import isEqual from 'lodash/isEqual';

import React from 'react';
import nextId from 'react-id-generator';

import { adalApiGet, adalApiPut } from 'framework/helpers/axios.methods';
import { NotificationStatus, NotificationType } from 'framework/systemNotifications/models/systemNotification.enums';

import { URL_SYSTEM_NOTIFICATIONS, URL_SYSTEM_NOTIFICATIONS_COUNT, URL_UPDATE_MANY_SYSTEM_NOTIFICATIONS, URL_UPDATE_SYSTEM_NOTIFICATION } from 'shared/navigation/baseUrlHelper';

import { mapSystemNotificationAPIToSystemNotification, SystemNotification, SystemNotificationAPI, SystemNotificationGroup } from '../../framework/systemNotifications/models/systemNotification.model';

export const getSystemNotificationsCountForUser = async (): Promise<number> => {
  const response = await adalApiGet<{count: number;}>(URL_SYSTEM_NOTIFICATIONS_COUNT());
  return response.data.count;
};

export const getSystemNotificationsForUser = async (): Promise<SystemNotification[]> => {
  const response = await adalApiGet<SystemNotificationAPI[]>(URL_SYSTEM_NOTIFICATIONS());
  return response.data.map((snAPI) => mapSystemNotificationAPIToSystemNotification(snAPI));
};

export const updateSystemNotification = async (notif: SystemNotification): Promise<SystemNotification> => {
  const response = await adalApiPut<SystemNotification,SystemNotification>(
    URL_UPDATE_SYSTEM_NOTIFICATION(notif.id),
    notif
  );
  return response.data;
};

interface UpdateManySystemNotificationsBody {
  notifIds: string[],
  update: Partial<SystemNotification>
}

export const updateManySystemNotifications = async (
  notifIds: string[],
  update: Partial<SystemNotification>
): Promise<SystemNotification[]> => {
  const response = await adalApiPut<UpdateManySystemNotificationsBody, SystemNotification[]>(
    URL_UPDATE_MANY_SYSTEM_NOTIFICATIONS(),
    {
      notifIds,
      update
    }
  );
  return response.data;
};

export const groupSystemNotificationsByContext = (
  notifs: SystemNotification[]
): SystemNotificationGroup[] => {
  const groups: SystemNotificationGroup[] = [];

  if (notifs.length > 1) {
    let remainingNotifs = [...notifs];

    // Each run through the while loop will reduce the length of remainingNotifs.
    // Exit while loop once remainingNotifs is empty. This means that teh grouping is finished.
    while (remainingNotifs.length > 0) {
      const notifToUse = { ...remainingNotifs[0] };
      const groupMetaData = notifToUse.metadata;

      // Used for the filtering of elements at the end of each forEach loop below.
      const tempRemainingNotifs = [...remainingNotifs];

      if (remainingNotifs.length === 1) {
        const idsToRemove: string[] = [];

        const groupToCreate: SystemNotificationGroup = {
          groupId: nextId(),
          notifications: [notifToUse],
          priority: notifToUse.priority,
          metadata: groupMetaData,
          status: NotificationStatus.New,
          type: notifToUse.type,
        };
      
        groups.push(groupToCreate);
        idsToRemove.push(notifToUse.id);
        remainingNotifs = tempRemainingNotifs.filter(n => !idsToRemove.includes(n.id));
      }
      else {
        //create array to loop through
        const arrayToSearch = [...remainingNotifs];
        arrayToSearch.splice(0, 1);

        const notificationsInGroup: SystemNotification[] = [notifToUse];
        const idsToRemove: string[] = [notifToUse.id];

        // Use the first element and loop through the rest of the array.
        // We're using the first element to search for other notififcations
        // with the same type and the same or similar metadata.
        arrayToSearch.forEach((n) => {
          if (
            notifToUse.type === NotificationType.NewArgumentInModDiscussion
            && n.type === notifToUse.type
            && isEqual(notifToUse.metadata.discussionId, n.metadata.discussionId)
          ) {
            idsToRemove.push(n.id);
            notificationsInGroup.push(n);
          }
          else if (notifToUse.type === n.type && isEqual(notifToUse.metadata, n.metadata)) {
            idsToRemove.push(n.id);
            notificationsInGroup.push(n);
          }
        });

        const groupToCreate: SystemNotificationGroup = {
          groupId: nextId(),
          notifications: notificationsInGroup,
          priority: notifToUse.priority,
          metadata: groupMetaData,
          status: NotificationStatus.New,
          type: notifToUse.type,
        };

        groups.push(groupToCreate);
      
        //Filter out elements
        remainingNotifs = tempRemainingNotifs.filter(n => !idsToRemove.includes(n.id));
      }
    }
  }
  else {
    const notifToUse = { ...notifs[0] };

    const groupToCreate: SystemNotificationGroup = {
      groupId: nextId(),
      notifications: [notifToUse],
      priority: notifToUse.priority,
      metadata: notifToUse.metadata,
      status: NotificationStatus.New,
      type: notifToUse.type,
    };
  
    groups.push(groupToCreate);
  }

  return groups;
};

// TODO: Improve this...
const parseTranslation = (group: SystemNotificationGroup, translation: string): JSX.Element => {
  Object.keys(group.metadata).forEach((meta, index) => {
    translation = translation.replace('{' + meta + '}', Object.values(group.metadata)[index]);
  });

  //Find and replace count
  translation = translation.replace('{count}', group.notifications.length.toString());

  //Replace *text* with <b>text</b>
  const charArr = translation.split('');
  const eleArr: (string | JSX.Element)[] = [];
  let lookingForStart = true;
  let startBoldIndex = 0;
  let endBoldIndex = 1;

  charArr.forEach((c, index) => {
    if (c === '*' && lookingForStart) {
      startBoldIndex = index;
      lookingForStart = false;
    }
    else if (!(c === '*') && !lookingForStart) {
      return;
    }
    else if (c === '*' && !lookingForStart) {
      endBoldIndex = index;
      lookingForStart = true;
      const textToBold = translation.substring(startBoldIndex + 1, endBoldIndex);
      eleArr.push(<b key={'b' + index}>{textToBold}</b>);
    }
    else {
      eleArr.push(c);
    }
  });

  // Create array of string + html fragments from array of char + html fragments
  let stringTemp = '';
  const finalElements: (string | JSX.Element)[] = []; 
  eleArr.forEach((e, index) => {
    if (typeof e === 'string') {
      stringTemp = stringTemp + e;
      if (index === eleArr.length - 1) {
        finalElements.push(stringTemp);
      }
    }
    else {
      finalElements.push(stringTemp);
      finalElements.push(e);
      stringTemp = '';
    }
  });

  const final = finalElements.filter(el => !(typeof el === 'string' && el === ''));
  const formattedTranslation = <span>{final}</span>;
  return formattedTranslation;
};

export const parseNotificationGroupMessageData = (
  notifGroup: SystemNotificationGroup
): JSX.Element => {
  let message: JSX.Element = <span></span>;

  switch (notifGroup.type) {
    case NotificationType.NewArgument: {
      message = parseTranslation(
        notifGroup,
        'TODO'
      );
      break;
    }
    case NotificationType.NewArgumentInModDiscussion: {
      message = parseTranslation(
        notifGroup,
        'TODO'
      );
      break;
    }
    case NotificationType.YouHaveBeenAddedAsMod: {
      message = parseTranslation(
        notifGroup,
        'TODO'
      );
      break;
    }
    case NotificationType.YouHaveBeenRemovedAsMod: {
      message = parseTranslation(
        notifGroup,
        'TODO'
      );
      break;
    }
    case NotificationType.ThereAreUnmoderatedThesesInDiscussion: {
      message = parseTranslation(
        notifGroup,
        'TODO'
      );
      break;
    }
    case NotificationType.NoModeratorsAddedToDiscussion: {
      message = parseTranslation(
        notifGroup,
        'TODO'
      );
      break;
    }
    case NotificationType.ModHasBeenAddedToDiscussion: {
      message = parseTranslation(
        notifGroup,
        'CCCC'
      );
      break;
    }
    case NotificationType.ModHasBeenRemovedFromDiscussion: {
      message = parseTranslation(
        notifGroup,
        'TODO'
      );
      break;
    }
    case NotificationType.ModHasBeenAddedToYourDiscussion: {
      message = parseTranslation(
        notifGroup,
        'TODO'
      );
      break;
    }
    case NotificationType.ModHasBeenRemovedFromYourDiscussion: {
      message = parseTranslation(
        notifGroup,
        'TODO'
      );
      break;
    }
    default: break;
  }

  return message;
};