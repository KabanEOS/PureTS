import { Tooltip } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import React from 'react';

import { useHistory } from 'react-router';

import { updateNotificationGroupStatus } from 'framework/systemNotifications/actions/systemNotifications.actions';
import { NotificationPriority, NotificationStatus } from 'framework/systemNotifications/models/systemNotification.enums';
import { SystemNotificationGroup } from 'framework/systemNotifications/models/systemNotification.model';
import { parseNotificationGroupMessageData } from 'shared/helpers/systemNotification.helper';
import systemNotificationStyles from 'shared/mui/systemNotificationStyles';

interface Props {
  notificationGroup: SystemNotificationGroup;
}

const NotificationListItem = (props: Props): JSX.Element => {
  const history = useHistory();
  const systemNotificationClasses = systemNotificationStyles(); 

  const parsedMessage = parseNotificationGroupMessageData(props.notificationGroup);

  const handleClickOnRedirect = (): void => {
    const pathObject: Record<string, string> = {
      pathname: '/discussions/' + props.notificationGroup.metadata.discussionId
    };

    if (props.notificationGroup.metadata.thesisId) 
      pathObject['search'] = '?focus=' + props.notificationGroup.metadata.thesisId;

    history.push(pathObject);
  };

  const handleClickOnArchive = (): void => {
    updateNotificationGroupStatus(props.notificationGroup.groupId, NotificationStatus.Archived);
  };

  const handleClickOnNotificationArea = (): void => {
    if (props.notificationGroup.status === NotificationStatus.Read) return;

    updateNotificationGroupStatus(props.notificationGroup.groupId, NotificationStatus.Read);
  };

  const isRead = props.notificationGroup.status === NotificationStatus.Read;
  const messageStyle = !isRead ? { cursor: 'pointer' } : { cursor: 'default' };

  return (
    <div
      className={`notifications__listItem ${isRead ? 'notifications__listItem--read' : ''}`}
    >
      <div className="notifications__listItem__content">
        <span className={`notifications__listItem__content__icon ${isRead ? 'notifications__listItem__content__icon--read' : ''}`}>
          {props.notificationGroup.priority === NotificationPriority.Important &&
            <PriorityHighIcon fontSize="small" className={systemNotificationClasses.icon}/>
          }
        </span>
        <span
          className={`notifications__listItem__content__message ${isRead ? 'notifications__listItem__content__message--read' : ''}`}
        >
          <span onClick={handleClickOnNotificationArea} style={messageStyle}>{parsedMessage}</span>
        </span>
        <div className={`notifications__listItem__content__actions ${isRead ? 'notifications__listItem__content__actions--read' : ''}`}>
          { props.notificationGroup.metadata.hasRedirect && 
            <Tooltip title={'Link'}>
              <OpenInNewIcon fontSize="small" className={systemNotificationClasses.icon} onClick={handleClickOnRedirect}/>
            </Tooltip>
          }
          <Tooltip title={'Archive'}>
            <CloseIcon fontSize="small" className={systemNotificationClasses.icon} onClick={handleClickOnArchive}/>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default NotificationListItem;