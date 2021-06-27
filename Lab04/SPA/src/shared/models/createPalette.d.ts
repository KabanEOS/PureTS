import '@material-ui/core/styles/createPalette';

declare module '@material-ui/core/styles/createPalette' {
  interface PaletteOptions {    
    navBar: PaletteColorOptions;
    agreeRelation: PaletteColorOptions;
    steelmanRelation: PaletteColorOptions;
    backgroundColorPrimary: PaletteColorOptions;
    backgroundColorSecondary: PaletteColorOptions;
    tileBorder: PaletteColorOptions;
    iconColor: PaletteColorOptions;
  }
  interface Palette {
    navBar: PaletteColor;
    agreeRelation: PaletteColor;
    steelmanRelation: PaletteColor;
    backgroundColorPrimary: PaletteColor;
    backgroundColorSecondary: PaletteColor;
    tileBorder: PaletteColor;
    iconColor: PaletteColor;
  }
}