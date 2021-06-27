import { makeStyles } from '@material-ui/core/styles';

import colors from 'scss/base/_colors.scss';
import typography from 'scss/base/_typography.scss';

const bottombarStyles = makeStyles((theme) => ({
  root: {
    marginRight: '15px',
    backgroundColor: theme.palette.primary.main,
    color: colors.whiteText,
    fontFamily: typography.familyBold
  },
  ready: {
    marginRight: '15px',
    backgroundColor: colors.brandGreen,
    color: colors.whiteText,
    fontFamily: typography.familyBold
  },
  readyButtonReminder: {
    fontFamily: typography.familyBold,
    padding: '10px',
  }
}));

export default bottombarStyles;