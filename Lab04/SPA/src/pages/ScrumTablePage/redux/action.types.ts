import { ActionEnum } from './action.enums';

export interface SyncMyScrums {
  type: ActionEnum.SYNC_SCRUMS;
  scrums: string[];
}

export type ScrumTableActionType = 
  SyncMyScrums