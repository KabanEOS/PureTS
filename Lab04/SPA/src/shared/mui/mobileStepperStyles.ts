import { makeStyles } from '@material-ui/core/styles';

export const mobileStepperStyles = makeStyles((theme) => ({
  noBackground: {
    background: 'none',
    color: 'white',
    fontSize: '16px'
  },
  disabled: {
    background: 'none',
    color: 'silver !important',
    fontSize: '16px'
  } 
}));