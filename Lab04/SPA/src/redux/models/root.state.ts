import { SnackbarNotification } from 'framework/snackbars/redux/snackbar.reducer';
import { SystemNotificationState } from 'framework/systemNotifications/redux/state.model';
import { UserProfile } from 'plugins/level-1/user/models/userProfile.model';
import { GlobalState } from 'redux/global/models/global.state';

export interface RootState {
  /** Currently logged in user. Null means that current user is anonymous. */
  user: UserProfile | null;

  /** Global state: navbar state etc. */
  global: GlobalState;

  organizationalUsers: string[];

  /** System Notifications for the current user */
  systemNotifications: SystemNotificationState;

  /** Snackbar. Displays notifications. */
  snackbarNotifications: SnackbarNotification[];
}