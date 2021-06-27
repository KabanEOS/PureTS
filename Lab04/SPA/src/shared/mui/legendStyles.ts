import { makeStyles } from '@material-ui/core/styles';

import colors from 'scss/base/_colors.scss';

export const legendStyles = makeStyles(() => ({
  regular: {
    fill: colors.brandDark,
  },
  dark: {
    fill: colors.whiteText
  }
}));