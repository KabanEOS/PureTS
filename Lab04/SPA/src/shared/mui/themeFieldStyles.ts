
import { createStyles, makeStyles } from '@material-ui/core/styles';

export const useThemeFieldClasses = makeStyles(() =>
  createStyles({
    half: {
      width: 'calc(50% - 10px)',
      marginRight: '10px'
    },
    third: {
      width: 'calc(33% - 10px)',
      marginRight: '10px'
    },
    fifth: {
      width: '50px'
    },
  }),
);

export const useExtendedLabelClasses = makeStyles(() =>
  createStyles({
    root: {
      '& label': {
        marginRight: '-30px',
      },
    },
  }),
);