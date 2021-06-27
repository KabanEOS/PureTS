import { ActionEnum } from './action.enums';
import * as AzureAdActionType from './action.types';

export const reduxSyncOrganizationalUsers = (
  users: string[]
): AzureAdActionType.SyncOrganizationalUsers => {

  return {
    type: ActionEnum.SYNC_ORGANIZATIONAL_USERS,
    users
  };
};