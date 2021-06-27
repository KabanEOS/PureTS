import { IconButton } from '@material-ui/core';
import React from 'react';

type Props = {
  handleClick?: () => void;
  icon: JSX.Element;
}

const ButtonWithIcon = (props: Props): JSX.Element => {
  return (
    <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={props.handleClick}>
      {props.icon}
    </IconButton>
  );
};

export default ButtonWithIcon;