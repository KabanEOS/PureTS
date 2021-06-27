import React, { useState, useEffect } from 'react';
import { SketchPicker, ColorChangeHandler } from 'react-color';

import { convertRBGColorToRGBAString } from 'shared/helpers/colors.helper';

import { ButtonType } from '../Button/ButtonType';
import { PrimaryButton } from '../Button/PrimaryButton';

type Props = {
  initialColorValue?: string;
  colorPickerPosition?: 'top' | 'bottom' | 'left' | 'right';
  onChangeComplete?: ColorChangeHandler | undefined;
}

const ColorPicker = (props: Props): JSX.Element => {
  const [colorValue, setColorValue] = useState<string>();
  const [showColorPicker, setShowColorPicker] = useState(false);

  useEffect(() => {
    if (props.initialColorValue) setColorValue(props.initialColorValue);
  });

  return (
    <>
      <svg 
        className={`svg__color`}
        onClick={(): void => setShowColorPicker(!showColorPicker)}
      >
        <rect rx={2} ry={2} width={20} height={20} fill={colorValue}></rect>
      </svg>
      { showColorPicker && 
        <div className={`colorPicker colorPicker--${props.colorPickerPosition}`}>
          <SketchPicker
            color={colorValue}
            onChange={(color): void => setColorValue(convertRBGColorToRGBAString(color.rgb))}
            onChangeComplete={props.onChangeComplete}
          />
          <PrimaryButton 
            additionalClass={'closeButton'}
            type={ButtonType.Disagree}
            handleClick={(): void => setShowColorPicker(false)}
            content={'BBBBBBBBBBBBBBBB'}
          />
        </div>
      }
    </>
  );
};

export default ColorPicker;