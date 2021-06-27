import { RGBColor } from 'react-color';

export const convertRBGColorToRGBAString = (rbgColor: RGBColor): string => {
  return `rgba(${ rbgColor.r }, ${ rbgColor.g }, ${ rbgColor.b }, ${ rbgColor.a })`;
};

export const convertRGBColorToHexString = (color: string): string => {
  return '#' + color.replace('rgb(', '').replace(')', '').replace(' ', '').split(',').map(
    (c) => parseInt(c, 0).toString(16)).join('');
};

/** Deprecated */
export const getCurrentGraphBackgroundColor = (): string | undefined => {
  const svgElement = document.getElementsByClassName('svg-box')[0];
  if (svgElement) {
    const computedColor = getComputedStyle(svgElement).getPropertyValue('background-color');
    return convertRGBColorToHexString(computedColor);
  }

  return undefined;
};

/** Deprecated */
export const adjustHexColor = (hexColor: string, percent: number): string => {
  const colorToAdjust = hexColor.length === 7 ? hexColor 
    : '#' + hexColor[1] + hexColor[1] + hexColor[2] + hexColor[2] + hexColor[3] + hexColor[3];

  const adjusted = '#' + colorToAdjust.replace(/^#/, '').replace(/../g, 
    c => ('0' + Math.min(255, Math.max(0, parseInt(c, 16) - percent)).toString(16)).substr(-2));

  return adjusted;
};


const rgb2hex = (rgb: string): string => {
  const regexedValue = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
  const newRgb = regexedValue !== null ? regexedValue : '';
  if (!newRgb) return '';
  return (newRgb && newRgb.length === 4) ? '#' +
   ('0' + parseInt(newRgb[1],10).toString(16)).slice(-2) +
   ('0' + parseInt(newRgb[2],10).toString(16)).slice(-2) +
   ('0' + parseInt(newRgb[3],10).toString(16)).slice(-2) : '';
};

export const lightenDarkenColor = (color: string, percent: number): string => {
  color = rgb2hex(color);
  const num = parseInt(color.replace('#', ''),16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const B = (num >> 8 & 0x00FF) + amt;
  const G = (num & 0x0000FF) + amt;

  return '#' + (
    0x1000000
    + (R < 255 ? R < 1 ? 0 : R : 255)
    * 0x10000
    + (B < 255 ? B < 1 ? 0 : B : 255)
    * 0x100
    + (G < 255 ? G < 1 ? 0 : G : 255)
  ).toString(16).slice(1);
};

/** Deprecated */
export const adjustColor = (color: string, percent: number): string => {
  if (color.indexOf('rgba') === 0) {
    const rgba = color.split('rgba(')[1].split(')')[0].split(',').map(s => s.replace(' ', ''));
    return `rgba(${ rgba[0] }, ${ rgba[1] }, ${ rgba[2] }, ${ parseFloat(rgba[3]) - percent / 100 })`;
  }

  if (color.indexOf('rgb') === 0) {
    const hexColor = convertRGBColorToHexString(color);
    return adjustHexColor(hexColor, percent);
  }

  return adjustHexColor(color, percent);
};