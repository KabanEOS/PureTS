import { makeStyles } from '@material-ui/core/styles';

import colors from 'scss/base/_colors.scss';
import fonts from 'scss/base/_typography.scss';

const fabButtonStyles = makeStyles(() => ({
  agree: {
    color: colors.brandDark,
    fontFamily: fonts.familyBold,
    fontSize: fonts.sizeSmall,
    backgroundColor: colors.argumentAgree,
    margin: 'auto',
    textAlign: 'center',
    '&:hover': { backgroundColor: colors.argumentAgree }
  },
  disagree: {
    color: colors.brandDark,
    fontFamily: fonts.familyBold,
    fontSize: fonts.sizeSmall,
    backgroundColor: colors.argumentDisagree,
    margin: 'auto',
    textAlign: 'center',
    '&:hover': { backgroundColor: colors.argumentDisagree }
  },
  info: {
    color: colors.brandDark,
    fontFamily: fonts.familyBold,
    fontSize: fonts.sizeSmall,
    backgroundColor: colors.editLight,
    margin: 'auto',
    textAlign: 'center',
    '&:hover': { backgroundColor: colors.editLight }
  },
  steelman: {
    color: colors.brandDark,
    fontFamily: fonts.familyBold,
    fontSize: fonts.sizeSmall,
    backgroundColor: colors.argumentSteelman,
    margin: 'auto',
    textAlign: 'center',
    '&:hover': { backgroundColor: colors.argumentSteelman }
  }
}));

export default fabButtonStyles;