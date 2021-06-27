/* eslint-disable react/prop-types */
import { Container } from 'inversify';
import React from 'react';

const InversifyContext = React.createContext<{ container: Container | null }>({ container: null });

type Props = {
  container: Container;
};

const InversifyContextProvider: React.FC<Props> = (props) => {
  return (
    <InversifyContext.Provider value={{ container: props.container }}>
      {props.children}
    </InversifyContext.Provider>
  );
};

export default InversifyContextProvider;