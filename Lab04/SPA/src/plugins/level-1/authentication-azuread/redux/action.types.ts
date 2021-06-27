import { ActionEnum } from './action.enums';

export interface SyncOrganizationalUsers {
  type: ActionEnum.SYNC_ORGANIZATIONAL_USERS;
  users: string[];
}

export type AzureAdActionType = 
  | SyncOrganizationalUsers