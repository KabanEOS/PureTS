import { MenuItem, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React from 'react';

import { FieldSize } from './formField.enums';

type Props = {
  label: string;
  value: string | string[];
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  className?: string;
  error?: boolean;
  selectValues?: string[];
  multiline?: boolean;
  autocompleteList?: string[];
  autocompleteChange?: ((event: React.ChangeEvent<Record<string, unknown>>, value: string[]) => void);
  dataCy?: string;
  disabled?: boolean;
  size?: FieldSize;
}

const FormField = (props: Props): JSX.Element => {
  if (props.selectValues) {
    return <TextField  
      size="small"
      disabled={props.disabled}  
      select
      error={props.error ? props.error : false}
      variant="outlined"
      className={props.className ? props.className : 'field__input'} 
      label={props.error ? `${props.label} (required)` : props.label} 
      onChange={props.onChange}
      value={props.value}
      margin="normal"
      SelectProps={{
        MenuProps: { disableScrollLock: true }
      }}
      data-cy={props.dataCy}
    >
      {props.selectValues.map((item: string) => (
        <MenuItem key={item} value={item}>{item}</MenuItem>
      ))}
    </TextField>;
  }
  
  if (props.autocompleteList) {
    return <Autocomplete<string, true>
      limitTags={4}
      multiple
      size="small"
      className={props.className ? props.className : 'field__input'}
      options={props.autocompleteList}
      getOptionLabel={(option): string => option}
      value={props.value as string[]}
      onChange={props.autocompleteChange}
      filterSelectedOptions
      renderInput={(params): React.ReactNode => (
        <TextField
          {...params}
          variant="outlined"
          label={props.label}
          margin="normal"
          fullWidth
        />
      )}
      data-cy={props.dataCy}
    />;
  }

  return <TextField 
    error={props.error ? props.error : false}
    variant="outlined"
    size={props.size ? props.size : FieldSize.Medium}
    className={props.className ? props.className : 'field__input'} 
    label={props.error ? `${props.label} (required)` : props.label} 
    onChange={props.onChange}
    value={props.value}
    margin="normal"
    multiline={props.multiline ? props.multiline : false}
    rows="2"
    rowsMax="2"
    data-cy={props.dataCy}
    disabled={props.disabled} 
  />;
};

export default FormField;