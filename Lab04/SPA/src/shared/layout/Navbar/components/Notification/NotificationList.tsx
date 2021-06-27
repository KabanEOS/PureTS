import React from 'react';

import { useSelector } from 'react-redux';

import { NotificationStatus } from 'framework/systemNotifications/models/systemNotification.enums';

import { RootState } from 'redux/models/root.state';

import NotificationListItem from './NotificationListItem';
import NotificationListOptions from './NotificationListOptions';

const NotificationList = (): JSX.Element => {
  const notificationGroups = useSelector((state: RootState) => state.systemNotifications.notificationGroups);
  const filteredList = notificationGroups.filter(
    ng => ng.status === NotificationStatus.New || ng.status === NotificationStatus.Read
  ).sort((a) => a.status === NotificationStatus.New ? -1 : 1);

  // TODO: Temporary view. To change.
  const listNoItems = <span className="notifications__listItem--none">{`You have ${filteredList.length} new notifications.`}</span>;
  const prefix = 'notificationGroup__';

  return (
    <>
      { filteredList.length === 0
        ? listNoItems
        : filteredList.map((n) => <NotificationListItem key={prefix + n.groupId} notificationGroup={n} />)
      }
      <NotificationListOptions />
    </>
  );
};

export default NotificationList;