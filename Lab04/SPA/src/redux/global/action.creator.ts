import { NavbarElements } from '../../shared/layout/Navbar/models/navbarElements.enums';

import { ActionEnum } from './action.enums';
import * as GlobalActionType from './action.types';

export const reduxSetNavbar = (navbarElements: NavbarElements[]
): GlobalActionType.SetNavbar => {
  return {
    type: ActionEnum.SET_NAVBAR,
    navbarElements
  };
};
