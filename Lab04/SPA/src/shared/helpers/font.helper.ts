import axios from 'axios';

export enum FontFamily {
  Titillium_Web = 'TitilliumWeb',
  //
  Open_Sans= 'OpenSans',
  //
  FiraSans = 'FiraSans',
  //
  MartelSans = 'MartelSans',
  //
  Mukta = 'Mukta',
}

export enum FontWeight {
  Light = 'Light',
  Regular = 'Regular',
  SemiBold = 'SemiBold',
  Bold = 'Bold',
}

export enum Font {
  Titillium_Web_Light = 'TitilliumWeb-Light',
  Titillium_Web_Regular = 'TitilliumWeb-Regular',
  Titillium_Web_SemiBold = 'TitilliumWeb-SemiBold',
  Titillium_Web_Bold = 'TitilliumWeb-Bold',
  //
  Open_Sans_Regular = 'OpenSans-Regular',
  //
  FiraSans_Regular = 'FiraSans-Regular',
  FiraSans_SemiBold = 'FiraSans-SemiBold',
  FiraSans_Bold = 'FiraSans-Bold',
  //
  MartelSans_Regular = 'MartelSans-Regular',
  MartelSans_SemiBold = 'MartelSans-SemiBold',
  MartelSans_Bold = 'MartelSans-Bold',
  //
  Mukta_Regular = 'Mukta-Regular',
  Mukta_SemiBold = 'Mukta-SemiBold',
  Mukta_Bold = 'Mukta-Bold',
}

export const createFontWeightMap = (fonts: Font[]): Record<string, string[]> => {
  const fontMap: Record<string, string[]> = {};

  Object.values(fonts).forEach(font => {
    const fontFamily = font.split('-')[0];
    const fontWeight = font.split('-')[1];
    if (!fontMap[fontFamily]) {
      fontMap[fontFamily] = [fontWeight];
    }
    else {
      fontMap[fontFamily] = [...fontMap[fontFamily], fontWeight];
    }
  });

  return fontMap;
};

export const getUrlForFont = (font: string): string => {
  switch (font) {
    case (FontFamily.Titillium_Web):
      return process.env.REACT_APP_URL + '/fonts/TitilliumWeb.ttc';
    case (FontFamily.Open_Sans):
      return process.env.REACT_APP_URL + '/fonts/OpenSans.ttc';
    case (FontFamily.FiraSans):
      return process.env.REACT_APP_URL + '/fonts/FiraSans.ttc';
    case (FontFamily.MartelSans):
      return process.env.REACT_APP_URL + '/fonts/MartelSans.ttc';
    case (FontFamily.Mukta):
      return process.env.REACT_APP_URL + '/fonts/Mukta.ttc';
    default:
      return '';  
  }
};

// export const getFontArrayBuffer = async (fontName: string): Promise<{ arrayBuffer: ArrayBuffer; isFontCollection: boolean }> => {
export const getFontArrayBuffer = async (fontName: string): Promise<ArrayBuffer> => {
  const fontFamily = fontName.split('-')[0];
  const fontUrl = getUrlForFont(fontFamily);
  const arrayBuffer = await axios.get<ArrayBuffer>(fontUrl, { responseType: 'arraybuffer' });
  return arrayBuffer.data;
};