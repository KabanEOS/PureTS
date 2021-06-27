import { makeStyles } from '@material-ui/core/styles';

const systemNotificationStyles = makeStyles((theme) => ({
  badge: {
    backgroundColor: 'red'
  },
  container: {
    top: '10px !important',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 100,
    width: '375px',
    fontSize: '10px !important',
  },
  popper: {
    paddingTop: '10px',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.paper,
    width: '100%'
  },
  icon: {
    fontSize: '1.0rem',
    '&:hover': {
      cursor: 'pointer',
    }
  },
  options: {
    backgroundColor: theme.palette.navBar.main,
  },
  optionButton: {
    backgroundColor: theme.palette.navBar.main,
    color: 'white'
  }
}));

export default systemNotificationStyles;