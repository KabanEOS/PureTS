import { ActionEnum } from './action.enums';
import { GlobalActionType } from './action.types';
import { GlobalState } from './models/global.state';

const initialState: GlobalState = {
  navbarElements: []
};

const global = (state: GlobalState = initialState, action: GlobalActionType
): GlobalState => {
  switch (action.type) {
    case ActionEnum.SET_NAVBAR:
      return { ...state, navbarElements: action.navbarElements };
    //
    default:
      return state;
  }
};

export default global;