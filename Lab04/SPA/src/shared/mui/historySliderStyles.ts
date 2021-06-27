import { Slider } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import colors from 'scss/base/_colors.scss';

export const sliderStyles = makeStyles(() => ({
  regular: {
    color: colors.brandDark,
  },
  dark: {
    color: colors.whiteText
  }
}));

export const SwarmSlider = withStyles(() => ({
  root: {
    height: 3
  },
  track: {
    height: 3
  },
  rail: {
    height: 3
  },
  mark: {
    height: 3,
    width: 3,
  },
  markActive: {
    backgroundColor: colors.greyText
  },
}))(Slider);
