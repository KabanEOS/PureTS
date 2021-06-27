
import { NavbarElements } from '../../shared/layout/Navbar/models/navbarElements.enums';

import { ActionEnum } from './action.enums';

export interface SetNavbar {
  type: ActionEnum.SET_NAVBAR;
  navbarElements: NavbarElements[];
}

export type GlobalActionType = 
  | SetNavbar