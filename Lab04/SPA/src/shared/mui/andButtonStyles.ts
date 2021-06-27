import { makeStyles } from '@material-ui/core/styles';

import colors from 'scss/base/_colors.scss';

export const andButtonStyles = makeStyles((theme) => ({
  andAgree: {
    display: 'none',
    position: 'absolute',
    padding: '6px',
    backgroundColor: theme.palette.background.paper,
    color: colors.argumentAgree,
    border: `1px solid ${colors.argumentAgree}`,
    [theme.breakpoints.up('md')]: {
      display: 'inline-flex'
    },
    '&:hover': {
      backgroundColor: colors.whiteText,
    }
  },
  andDisagree: {
    display: 'none',
    position: 'absolute',
    padding: '6px',
    backgroundColor: theme.palette.background.paper,
    color: colors.argumentDisagree,
    border: `1px solid ${colors.argumentDisagree}`,
    [theme.breakpoints.up('md')]: {
      display: 'inline-flex'
    },
    '&:hover': {
      backgroundColor: colors.whiteText,
    }
  },
  andSteelman: {
    display: 'none',
    position: 'absolute',
    padding: '6px',
    backgroundColor: theme.palette.background.paper,
    color: colors.argumentSteelman,
    border: `1px solid ${colors.argumentSteelman}`,
    [theme.breakpoints.up('md')]: {
      display: 'inline-flex'
    },
    '&:hover': {
      backgroundColor: colors.whiteText,
    }
  },
  root: {
    '&$disabled': {
      backgroundColor: colors.greyText,
      border: `1px solid ${colors.greyText}`,
      opacity: '0.3'
    },
  },
  disabled: {},
}));