import { fade, makeStyles } from '@material-ui/core/styles';

import typography from 'scss/base/_typography.scss';

export const navStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: 99,
    height: 80,
    flexGrow: 1,
    width: '100vw'
  },
  toolbar: {
    height: 80,
    backgroundColor: theme.palette.navBar.main,
    overflow: 'hidden'
  },
  pageTitle: {
    margin: '0px 50px',
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
    textAlign: 'center',
    flexGrow: 1,
    flexBasis: '100%',
    fontFamily: typography.fontfamilySemibold,
    fontSize: 18,
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 1),
    height: '100%',
    right: 0,
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 1),
    // vertical padding + font size from searchIcon
    paddingRight: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('lg')]: {
      width: '20ch',
    },
  },
  displayElements: {
    display: 'none',
    [theme.breakpoints.up('lg')]: {
      display: 'flex',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  muiDisabled: {
    fontFamily: 'Arial',
    opacity: '1 !important',
    fontWeight: 'bold'
  },
  navLink: {
    display: 'flex',
  },
  navIcon: {
    color: 'white',
    width: '64px'
  },
  navIconBlack: {
    color: 'black',
  },
  avatar: {
    width: '24px',
    height: '24px'
  }
}));