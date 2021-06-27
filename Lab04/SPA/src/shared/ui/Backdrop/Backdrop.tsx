import React from 'react';

type Props = {
  show: boolean; 
  clicked: () => void;
}

const Backdrop = (props: Props): JSX.Element => {

  return (
    <>
      {
        props.show &&
        <div 
          style={{ backgroundColor: undefined
          }}
          className="backdrop backdrop--regular" 
          onClick={props.clicked}>
        </div>
      }
    </>
  );
};

export default Backdrop;