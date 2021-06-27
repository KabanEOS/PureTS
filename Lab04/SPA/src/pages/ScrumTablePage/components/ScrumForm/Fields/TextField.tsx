import { Field } from 'formik';
import React, { FC } from 'react';

import { MyField } from '../../ScrumField/ScrumField';

interface Props {
  name:string,
}

export const TextField:FC <Props> = (props:Props) => {
  return (
    <div>
      <Field
        name={props.name}
        placeholder={props.name}
        component={MyField}
      />
    </div>
  );
};
  