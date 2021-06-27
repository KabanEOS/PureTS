
import { ActionEnum } from './action.enums';
import { AzureAdActionType } from './action.types';

const organizationalUsers = (state: string[] = [], action: AzureAdActionType): string[] => {
  switch (action.type) {
    case ActionEnum.SYNC_ORGANIZATIONAL_USERS:
      return { ...action.users };
    //
    default: 
		  return state;
  }
};

export default organizationalUsers;