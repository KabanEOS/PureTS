import { makeStyles } from '@material-ui/core/styles';

import colors from 'scss/base/_colors.scss';
import fonts from 'scss/base/_typography.scss';

export const primaryStyles = makeStyles(() => ({
  agree: {
    color: colors.brandDark,
    fontFamily: fonts.familyBold,
    fontSize: fonts.sizeLittle,
    letterSpacing: fonts.letterSpacing,
    backgroundColor: colors.argumentAgree,
    borderRadius: '10px',
    margin: 'auto',
    textAlign: 'center',
    '&:hover': { backgroundColor: colors.brandDarkGreen }
  },
  xsAgree: {
    color: colors.brandDark,
    fontFamily: fonts.familyBold,
    fontSize: fonts.sizeVeryLittle,
    letterSpacing: fonts.letterSpacingSmall,
    backgroundColor: colors.argumentAgree,
    borderRadius: '10px',
    margin: 'auto',
    textAlign: 'center',
    '&:hover': { backgroundColor: colors.brandDarkGreen },
    width: 'fit-content'
  },
  disagree: {
    color: colors.brandDark,
    fontFamily: fonts.familyBold,
    fontSize: fonts.sizeLittle,
    letterSpacing: fonts.letterSpacing,
    backgroundColor: colors.argumentDisagree,
    borderRadius: '10px',
    margin: 'auto',
    textAlign: 'center',
    '&:hover': { backgroundColor: colors.argumentDisagreeLight }
  },
  steelman: {
    color: colors.brandDark,
    fontFamily: fonts.familyBold,
    fontSize: fonts.sizeLittle,
    letterSpacing: fonts.letterSpacing,
    backgroundColor: colors.argumentSteelman,
    borderRadius: '10px',
    margin: 'auto',
    textAlign: 'center',
    '&:hover': { backgroundColor: colors.argumentSteelmanLight }
  },
  info: {
    color: colors.brandDark,
    fontFamily: fonts.familyBold,
    fontSize: fonts.sizeLittle,
    letterSpacing: fonts.letterSpacing,
    backgroundColor: colors.editLight,
    borderRadius: '10px',
    margin: 'auto',
    textAlign: 'center',
    '&:hover': { backgroundColor: colors.infoColor }
  },
  yellow: {   
    background: colors.yellowButton,
    fontFamily: fonts.familyBold,
    boxShadow: `0px 9px 17px ${colors.yellowShadow}`,
    borderRadius: '10px',
    fontSize: fonts.sizeLittle,
    letterSpacing: fonts.letterSpacing,
    margin: 'auto',
    color: colors.whiteText,
    '&:hover': { background: colors.yellowButton }
  },
  blue: {   
    background: colors.blueButton,
    fontFamily: fonts.fontfamilyRegular,
    // boxShadow: `0px 9px 17px ${colors.blueShadow}`,
    borderRadius: '10px',
    fontSize: fonts.fontSizeMedium,
    letterSpacing: fonts.letterSpacing,
    // margin: 'auto',
    color: colors.whiteText,
    '&:hover': { background: colors.blueShadow },
    textTransform: 'capitalize',
    paddingLeft: '25px',
    paddingRight: '25px',
  },
  raised: {
    boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)',
  },
}));

export const secondaryStyles = makeStyles(() => ({
  agree: {
    color: colors.argumentAgree,
    fontFamily: fonts.familyBold,
    fontSize: fonts.sizeLittle,
    letterSpacing: fonts.letterSpacing,
    border: `1px solid ${colors.argumentAgree}`,
    borderRadius: '10px',
    margin: 'auto',
    textAlign: 'center',
    '&:hover': { backgroundColor: colors.brandDarkGreen }
  },
  disagree: {
    color: colors.argumentDisagree,
    fontFamily: fonts.familyBold,
    fontSize: fonts.sizeLittle,
    letterSpacing: fonts.letterSpacing,
    border: `1px solid ${colors.argumentDisagree}`,
    borderRadius: '10px',
    margin: 'auto',
    textAlign: 'center',
    '&:hover': { backgroundColor: colors.argumentDisagreeLight }
  },
  info: {
    color: colors.greyText,
    fontFamily: fonts.familyBold,
    fontSize: fonts.sizeLittle,
    letterSpacing: fonts.letterSpacing,
    border: `1px solid ${colors.greyText}`,
    borderRadius: '10px',
    margin: 'auto',
    textAlign: 'center',
  },
  xsInfo: {
    // color: colors.greyText,
    fontFamily: fonts.familyBold,
    fontSize: fonts.sizeVeryLittle,
    letterSpacing: fonts.letterSpacingSmall,
    border: `1px solid ${colors.greyText}`,
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    textAlign: 'center',
  },
  white: {
    color: colors.whiteText,
    fontFamily: fonts.familyBold,
    fontSize: fonts.sizeLittle,
    letterSpacing: fonts.letterSpacing,
    border: `1px solid ${colors.whiteText}`,
    borderRadius: '10px',
    margin: 'auto',
    textAlign: 'center',
    '&:hover': { backgroundColor: colors.lightGreyText },
  },
}));

export const sharedButtonStyles = makeStyles(() => ({
  backgroundModal: {
    color: colors.whiteText,
    fontFamily: fonts.fontSizeSmall,
    fontSize: fonts.sizeLittle,
    letterSpacing: fonts.letterSpacing,
    margin: 'auto',
    textAlign: 'center',
    size: 'small'
  },
}));