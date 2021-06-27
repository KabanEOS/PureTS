import { makeStyles } from '@material-ui/core/styles';

export const textFieldStyles = makeStyles(() => ({
  root: {
    color: 'inherit',
    '& .MuiOutlinedInput-root': {
      height: '44px',
    },
  },
  rootModal: {
    height: '44px',
  }
}));
