import { MenuItem, TextField } from '@material-ui/core';
import React from 'react';

type Props = {
  value: string | string[];
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  error?: boolean;
  selectValues?: string[];
  dataCy?: string;
}

const TableField = (props: Props): JSX.Element => {
  if (props.selectValues) {
    return <TextField  
      size="small"
      select
      error={props.error ? props.error : false} 
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

  return <TextField
    defaultValue={props.value}
    onChange={props.onChange}
    size="medium"
    multiline
    rows={1}
    rowsMax={3}
    fullWidth
  />;
};

export default TableField;