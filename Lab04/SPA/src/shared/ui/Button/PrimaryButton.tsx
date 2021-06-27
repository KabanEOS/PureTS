import { Button } from '@material-ui/core';
import React from 'react';

import { primaryStyles } from 'shared/mui/buttonStyles';

import { ButtonType } from './ButtonType';

export interface Props {
  id?: string;
  handleClick?: () => void;
  type: ButtonType;
  content: string|JSX.Element;
  raised?: boolean;
  disabled?: boolean;
  icon?: JSX.Element;
  dataCy?: string;
  additionalClass?: string;
  size?: 'xs' | 'small' | 'medium' | 'large';
  color?: string;
}

export const PrimaryButton = (props: Props): JSX.Element => {

  const classes = primaryStyles();
  const raised = props.raised ? classes.raised : '';

  const size = props.size === 'xs' ? 'small' : props.size;

  let style;
  if (props.size === 'xs') {
    switch (props.type) {
      case ButtonType.Agree: style = classes.xsAgree; 
    }
  }
  else {
    switch (props.type) {
      case ButtonType.Agree: style = classes.agree; break;
      case ButtonType.Disagree: style = classes.disagree; break;
      case ButtonType.Steelman: style = classes.steelman; break;
      case ButtonType.Info: style = classes.info; break;
      case ButtonType.Yellow: style = classes.yellow; break;
      case ButtonType.Blue: style = classes.blue; break;
    }
  }

  return (
    <Button 
      id={props.id}
      size={props.size ? size : 'medium'} 
      className={`${style} ${raised} ${props.additionalClass}`} 
      onClick={props.handleClick} 
      startIcon={props.icon ? props.icon : null}
      disabled={props.disabled ? props.disabled : false}
      data-cy={props.dataCy}
    >
      {props.content}
    </Button>
  );
};

export default PrimaryButton;