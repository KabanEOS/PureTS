import { useTheme, ThemeProvider } from '@material-ui/core/styles';

import React from 'react';
import { Transition } from 'react-transition-group';

import { GlobalTheme } from 'models/graph/theme.model';

import { AppTime } from 'shared/models/time.enums';
import { swarmLight } from 'shared/mui/swarmThemes';

import Backdrop from './../Backdrop/Backdrop';

type Props = {
  show: boolean;
  modalClosed?: () => void;
  children: Element | JSX.Element;
}

const Modal = (props: Props): JSX.Element => {

  const theme = useTheme();

  let open = false;
  open = props.show ? true : false;
  
  return (
    <ThemeProvider theme={theme.name === GlobalTheme.SON ? swarmLight : theme}>
      <Transition
        in={props.show}
        timeout={
          { 
            appear: AppTime.TransitionAppear, 
            enter: AppTime.TransitionEnter, 
            exit: AppTime.TransitionExit 
          }
        }
        unmountOnExit={true}
      >
        <>
          <Backdrop show={props.show} clicked={(): void => {
            if (props.modalClosed) props.modalClosed(); 
          }}
          />
          <div 
            className={open === true ? 'modal modal--visible' : 'modal modal--hidden'}
          >
            {props.children}
          </div>
        </>
      </Transition>
    </ThemeProvider>
  );
};

export default React.memo(
  Modal,
  (prevProps, nextProps) =>
    nextProps.show === prevProps.show &&
    nextProps.children === prevProps.children
);
