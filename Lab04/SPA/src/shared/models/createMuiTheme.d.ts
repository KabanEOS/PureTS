import '@material-ui/core/styles/createMuiTheme';

declare module '@material-ui/core/styles/createMuiTheme' {
  interface ThemeOptions {
    name: string;
  }

  interface Theme {
    name: string;
  }
}