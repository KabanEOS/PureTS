export interface Theme {
  backgroundColor: string;
  modalBackground: string;
  loaderBackground: string;
  //
  tileColor: string;
  tileBorder: string;
  textColor: string;
  //
  brandColor: string;
  sidePanelColor: string;
  leftIconsBgColor: string;
  dialogBackgroundColor: string;
  linkColor: string;
  linkOnHoverColor: string;
  agreeRelationColor: string;
};

export interface Themes {
  regular: Theme;
  son: Theme;
}

export const styles: Themes;

export default styles;