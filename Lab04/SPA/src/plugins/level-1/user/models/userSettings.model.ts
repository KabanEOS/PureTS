import { GlobalTheme } from 'models/graph/theme.model';

export interface UserSettings { 
  languageIso: string;
  theme: GlobalTheme;
  systemNotificationsActive: boolean;
  slackBotNotificationsActive: boolean;
}