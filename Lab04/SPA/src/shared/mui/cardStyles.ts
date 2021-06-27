import { makeStyles } from '@material-ui/core/styles';

const cardStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.paper
  },
  link: {
    color: theme.palette.agreeRelation.main,
    maxWidth: '100%',
    '&:hover': {
      color: theme.palette.primary.main
    },
    '&:link': {
      color: theme.palette.agreeRelation.main
    }

  }
}));

export default cardStyles;