import { Form, Formik } from 'formik';
import React, { useState } from 'react';

import { useScrumList } from 'contexts/ScrumList/ScrumList';
import { ProjectFromDB } from 'models/project/project.model';

import { AddButton } from './AddButton';
import SelectProjectField from './Fields/SelectProjectField';
import { TextField } from './Fields/TextField';

interface Props {
  onClose: () => void;
};

const initialValues = {
  task: '',
  project: '',
  description: '',
  time: '0h 0m',
  date: new Date(),
};

export const ScrumForm = (props: Props): JSX.Element => {
  const [projectValue, setProjectValue] = useState<ProjectFromDB | null>(null);
  const { handleSubmit } = useScrumList();

  return (
    <Formik initialValues={initialValues} onSubmit={(values, { resetForm }) => {
      //inject projectid from state
      values.project = projectValue ? projectValue.id : '';
      handleSubmit(values);
      resetForm();
      props.onClose();
    }}>
      {() => (
        <Form translate="yes">
          <TextField name={'task'} />
          <SelectProjectField value={projectValue} setValue={setProjectValue}/>
          <TextField name={'description'} />
          <TextField name={'time'} />
          <TextField name={'date'} />
          <AddButton />
        </Form>
      )}
    </Formik>
  );
};

