import { GlobalTheme } from 'models/graph/theme.model';
import { saveUserSettings } from 'plugins/level-1/user/api-handlers/user.handler';
import { reduxSwitchUserTheme, reduxUpdateUserSettings } from 'plugins/level-1/user/redux/action.creator';
import store from 'redux/store';

export const switchUserTheme = async (theme: GlobalTheme): Promise<void> => {
  const user = store.getState().user;
  if (user) {
    await saveUserSettings( { ...user.preferredSettings, theme: theme });
    store.dispatch(reduxSwitchUserTheme(theme));
  }
};

export const updateSystemNotificationSetting = async (systemNotificationsActive: boolean): Promise<void> => {
  const user = store.getState().user;
  if (user) {
    store.dispatch(reduxUpdateUserSettings({ ...user.preferredSettings, systemNotificationsActive }));
    await saveUserSettings( { ...user.preferredSettings, systemNotificationsActive });
  }
};

export const updateSlackbotNotificationSetting = async (slackBotNotificationsActive: boolean): Promise<void> => {
  const user = store.getState().user;
  if (user) {
    store.dispatch(reduxUpdateUserSettings({ ...user.preferredSettings, slackBotNotificationsActive }));
    await saveUserSettings( { ...user.preferredSettings, slackBotNotificationsActive });
  }
};