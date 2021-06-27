import { ActionEnum } from './action.enums';
import { ScrumTableActionType } from './action.types';
import { ScrumTableModel } from './models/scrumTablePage.model';

const discussionList = (state = { scrums: [] }, action: ScrumTableActionType): ScrumTableModel => {
  switch (action.type) {
    case ActionEnum.SYNC_SCRUMS:
      return { ...state, scrums: action.scrums };

	  default: 
		  return state;
  }
};

export default discussionList;