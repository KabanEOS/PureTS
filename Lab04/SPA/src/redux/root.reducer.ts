
import { combineReducers } from 'redux';

import snackbarNotifications from 'framework/snackbars/redux/snackbar.reducer';
import systemNotifications from 'framework/systemNotifications/redux/systemNotification.reducer';
import organizationalUsers from 'plugins/level-1/authentication-azuread/redux/azuread.reducer';
import user from 'plugins/level-1/user/redux/user.reducer';

import global from '../redux/global/global.reducer';

import { RootState } from './models/root.state';

const rootReducer = combineReducers<RootState>({
  user,
  global,
  organizationalUsers,
  systemNotifications,
  snackbarNotifications
});

export default rootReducer;