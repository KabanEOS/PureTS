import React from 'react';

interface props {
  children?: React.ReactNode;
  contextProvidersArray: JSX.Element[];
}

const createNestedElements = ( elementArray: JSX.Element[], children: React.ReactNode ): JSX.Element => {
  const element = elementArray[0];
  const newArray = elementArray.slice(1);

  if (!element) return <>{ children }</>;

  return React.createElement(
    element.type, 
    { key: element.type }, 
    <>{createNestedElements(newArray, children)}</>
  );
};

const CombineContexts = ({ children, contextProvidersArray }: props): JSX.Element => {
  return (
    <>
      {createNestedElements(contextProvidersArray, children)}
    </>
  );
};

export default CombineContexts;
