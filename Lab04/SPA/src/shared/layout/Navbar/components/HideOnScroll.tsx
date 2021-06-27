import { Slide, useScrollTrigger } from '@material-ui/core';
import React from 'react';

type Props = {
  children: JSX.Element;
}

const HideOnScroll = (props: Props): JSX.Element => {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

export default React.memo(HideOnScroll);