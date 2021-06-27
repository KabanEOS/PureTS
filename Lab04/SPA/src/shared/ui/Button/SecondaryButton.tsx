import Button from '@material-ui/core/Button';
import React, { CSSProperties } from 'react';

import { secondaryStyles } from 'shared/mui/buttonStyles';

import { ButtonType } from './ButtonType';

type Props = {
  id?: string;
  handleClick?: () => void;
  type: ButtonType;
  content: string|JSX.Element;
  icon?: JSX.Element;
  disabled?: boolean;
  dataCy?: string;
  size?: 'xs' | 'small' | 'medium' | 'large';
  additionalClass?: string;
  style?: CSSProperties;
}

const SecondaryButton = (props: Props): JSX.Element => {
  const classes = secondaryStyles();
  
  const size = props.size === 'xs' ? 'small' : props.size;

  let style;
  if (props.size === 'xs') {
    switch (props.type) {
      case ButtonType.Agree: style = classes.agree; break;
      case ButtonType.Disagree: style = classes.disagree; break;
      case ButtonType.White: style = classes.white; break;
      case ButtonType.Info: style = classes.xsInfo;
    }
  }
  else {
    switch (props.type) {
      case ButtonType.Agree: style = classes.agree; break;
      case ButtonType.Disagree: style = classes.disagree; break;
      case ButtonType.White: style = classes.white; break;
      case ButtonType.Info: style = classes.info;
    }
  }
  

  return (
    <Button 
      id={props.id}
      size={props.size ? size : 'large'} 
      variant="outlined"
      className={`${style} ${props.additionalClass}`} 
      startIcon={props.icon ? props.icon : null}
      onClick={(): (void|null) => (
        typeof props.handleClick === 'function' 
          ? props.handleClick() 
          : null
      )} 
      disabled={props.disabled ? props.disabled : false}
      data-cy={props.dataCy}
      style={props.style ? props.style : undefined}
    >
      {props.content}
    </Button>
  );
};

export default SecondaryButton;