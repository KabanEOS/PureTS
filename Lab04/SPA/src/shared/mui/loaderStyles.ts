import { makeStyles } from '@material-ui/core/styles';

import colors from 'scss/base/_colors.scss';

type Props = {
  color?: string;
  backgroundColor?: string;
};

export const loaderStyles = makeStyles(() => ({
  loader: {
    color: (props: Props): string|undefined => props.color,
    animationDuration: '550ms'
  }
}));

export const loaderProgressStyles = makeStyles(() => ({
  loader: {
    backgroundColor: colors.brandGreyDark,
    animationDuration: '1s',
    '& > div': {
      backgroundColor: (props: Props): string|undefined => props.backgroundColor,
    }
  }
}));