import { Theme } from '@material-ui/core/styles/createMuiTheme';

import { GlobalTheme } from 'models/graph/theme.model';
import { themes } from 'shared/mui/swarmThemes';

export const getMuiThemeFromCurrentTheme = (theme: GlobalTheme): Theme => { 
  return themes[theme];
};