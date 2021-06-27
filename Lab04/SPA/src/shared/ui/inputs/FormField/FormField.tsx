import { MenuItem, TextField, TextFieldProps } from '@material-ui/core';
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
  valuesDescriptions?: string[];
  multiline?: boolean;
  autocompleteList?: string[];
  autocompleteChange?: ((event: React.ChangeEvent<Record<string, unknown>>, value: string[]) => void);
  dataCy?: string;
  disabled?: boolean;
  size?: FieldSize;
  helperText?: string;
  variantStandard?: boolean;
  textFieldProps?: TextFieldProps;
}

const FormField = (props: Props): JSX.Element => {

  if (props.selectValues) {
    
    const menuItems = 
      props.selectValues.map((item: string) => {
        return (
          <MenuItem key={item} value={item}>{item}</MenuItem>
        );
      });

    return <TextField  
      size="small"
      color="primary"
      disabled={props.disabled}  
      select
      error={props.error ? props.error : false}
      variant={props.variantStandard ? 'standard' : 'outlined'}
      className={props.className ? props.className : 'field__input'} 
      label={props.error ? `${props.label} (required)` : props.label} 
      onChange={props.onChange}
      value={props.value}
      margin="normal"
      helperText={props.helperText}
      SelectProps={{
        MenuProps: { disableScrollLock: true }
      }}
      data-cy={props.dataCy}
    >
      {menuItems}
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
          variant={props.variantStandard ? 'standard' : 'outlined'}
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
    variant={props.variantStandard ? 'standard' : 'outlined'}
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
    helperText={props.helperText}
    color="secondary"
    {...props.textFieldProps}
  />;
};

export default FormField;