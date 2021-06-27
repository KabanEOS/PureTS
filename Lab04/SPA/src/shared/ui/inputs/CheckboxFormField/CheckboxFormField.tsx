import { Checkbox, FormControl, InputLabel, ListItemText, MenuItem, Select } from '@material-ui/core';
import React, { ReactNode } from 'react';

type Props = {
  label?: string;
  value: string[];
  setValues: ((items: string[]) => void );
  selectValues: string[];
  className?: string;
  dataCy?: string;
  outlined?: boolean;
  disableFullWidth?: boolean;
}

const CheckboxFormField = (props: Props): JSX.Element => {

  const selectCheckboxHandler = (event: React.ChangeEvent<{ value: unknown }>): void => {
    props.setValues(event.target.value as string[]);
  };

  return (
    <FormControl 
      variant={props.outlined ? 'outlined' : 'standard'} 
      className={props.className} 
      size="small" 
      margin="normal" 
      fullWidth={props.disableFullWidth ? false : true}>

      {props.outlined ? <InputLabel>{props.label}</InputLabel> : <></>}

      <Select
        label={props.label}
        value={props.value}
        multiple
        onChange={selectCheckboxHandler}
        renderValue={(selected): ReactNode => (selected as string[]).join(', ')}
      >

        {props.selectValues.map((value: string) => (
          <MenuItem key={value} value={value}>
            <Checkbox checked={props.value.indexOf(value) > -1} />
            <ListItemText primary={value} />
          </MenuItem>))}
          
      </Select>
    </FormControl>
  );
};

export default CheckboxFormField;