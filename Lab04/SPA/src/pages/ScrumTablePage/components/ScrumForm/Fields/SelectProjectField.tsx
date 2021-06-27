import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import React, { Dispatch, SetStateAction } from 'react';

import { useProjectList } from 'contexts/ProjectList/ProjectList';
import { ProjectFromDB } from 'models/project/project.model';


interface props {
  value: ProjectFromDB | null;
  setValue: Dispatch<SetStateAction<ProjectFromDB | null>>;
}

export default function SelectProjectField({ value, setValue }: props): JSX.Element {
  const { projects } = useProjectList();
  const [inputValue, setInputValue] = React.useState('');

  return (
    <Autocomplete
      value={value}
      onChange={(event: any, newValue: ProjectFromDB | null) => {
        setValue(newValue);
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      getOptionLabel={(option) => option.shortName}
      id="controllable-states-demo"
      options={projects}
      style={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Controllable" variant="outlined" />}
    />
  );
}