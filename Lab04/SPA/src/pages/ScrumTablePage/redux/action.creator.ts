import { ActionEnum } from './action.enums';
import * as ScrumTableActionType from './action.types';

export const reduxSyncScrum = (): ScrumTableActionType.SyncMyScrums => {
  return {
    type: ActionEnum.SYNC_SCRUMS, 
    scrums: []
  };
};