import { createMuiTheme } from '@material-ui/core/styles';

import { GlobalTheme } from 'models/graph/theme.model';

import colors from 'scss/base/_colors.scss';

const breakpoints = {
  values: {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 1280,
    xl: 1680
  }
};

export const swarmLight = createMuiTheme({
  name: GlobalTheme.Regular,
  breakpoints: breakpoints,
  typography: {
    fontFamily: 'FiraSans-Regular'
  },
  palette: {
    primary: {
      main: colors.muiPrimary,
    },
    secondary: {
      main: colors.muiSecondary,
    },
    navBar: {
      main: colors.muiPrimary
    },
    agreeRelation: {
      main: colors.darkArgumentAgree
    },
    steelmanRelation: {
      main: colors.argumentSteelman
    },
    backgroundColorPrimary: {
      main: 'white'
    },
    backgroundColorSecondary: {
      main: 'white'
    },
    tileBorder: {
      main: colors.argumentBorder
    },
    iconColor: {
      main: colors.regularThemeIconColor
    }
  } 
});

const swarmDark = createMuiTheme({
  name: GlobalTheme.Dark,
  breakpoints: breakpoints,
  typography: {
    fontFamily: 'FiraSans-Regular'
  },
  palette: {
    type: 'dark',
    primary: {
      main: colors.muiSecondary,
    },
    secondary: {
      main: colors.muiSecondary,
    },
    background: {
      paper: colors.brandGreyDark,
    },
    navBar: {
      main: colors.muiPrimary
    },
    action: {
      disabled: colors.muiSecondary
    },
    agreeRelation: {
      main: colors.argumentAgree
    },
    steelmanRelation: {
      main: colors.argumentSteelman
    },
    backgroundColorPrimary: {
      main: colors.brandDark
    },
    backgroundColorSecondary: {
      main: colors.brandDark
    },
    tileBorder: {
      main: colors.argumentBorder
    },
    iconColor: {
      main: colors.muiSecondary
    }
  }
});
//TODO add main font
const darkBlue = createMuiTheme({
  name: GlobalTheme.SON,
  breakpoints: breakpoints,
  typography: {
    fontFamily: 'FiraSans-Regular'
  },
  palette: {
    type: 'dark',
    primary: {
      main: colors.mjnDarkBlue,
    },
    secondary: {
      main: colors.muiSecondary,
    },
    background: {
      paper: colors.mjnBlue
    },
    navBar: {
      main: colors.mjnDarkBlue
    },
    action: {
      disabled: colors.greyText
    } ,
    agreeRelation: {
      main: colors.argumentAgree
    },
    steelmanRelation: {
      main: colors.argumentSteelman
    },
    backgroundColorPrimary: {
      main: colors.mjnBlue
    },
    backgroundColorSecondary: {
      main: colors.mjnBlue
    },
    tileBorder: {
      main: colors.argumentBorder
    },
    iconColor: {
      main: colors.muiSecondary
    }
  }
});

export const themes = {
  [GlobalTheme.Regular]: swarmLight, 
  [GlobalTheme.Dark]: swarmDark, 
  [GlobalTheme.SON]: darkBlue };
