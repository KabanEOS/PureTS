import Fab from '@material-ui/core/Fab';
import React from 'react';

import { MouseClickEvent } from 'shared/helpers/common.events';
import fabButtonStyles from 'shared/mui/fabButtonStyles';

type Props = {
  type: string;
  content: string|JSX.Element;
  handleClick?: (event: MouseClickEvent) => void;
  submit?: boolean;
  id?: string;
  dataCy?: string;
}

const SwarmButton = (props: Props): JSX.Element => {
  const classes = fabButtonStyles();

  let style;
  if (props.type === 'agree') style = classes.agree;
  else if (props.type === 'disagree') style = classes.disagree;
  else if (props.type === 'info') style = classes.info;
  else if (props.type === 'steelman') style = classes.steelman;

  return (
    <Fab 
      id={props.id}
      variant="extended" 
      type={props.submit ? 'submit' : 'button'}
      className={style} 
      onClick={props.handleClick} 
      data-cy={props.dataCy}
    >
      {props.content}
    </Fab>
  );        
};

export default SwarmButton;