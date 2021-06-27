import { MenuItem, TextField, Checkbox, ListItemText } from '@material-ui/core';
import React from 'react';

import { EnabledItem } from './checkbox.model';

type Props = {
  label?: string;
  value: string;
  items: EnabledItem[];
  setValues: ((items: EnabledItem[]) => void );
  selectValues: string[];
  className?: string;
  dataCy?: string;
  outlined?: boolean;
}

const CheckboxFormField = (props: Props): JSX.Element => {

  const selectCheckboxHandler = (event: React.ChangeEvent<{ value: unknown }>, value: string): void => {
    const index = props.items.findIndex(a => a.name === value);
    const updatedActions = [...props.items];
    updatedActions[index].isEnabled = !(updatedActions[index].isEnabled);
    props.setValues(updatedActions);
  };

  return (
    <TextField  
      size="small"
      select
      variant={props.outlined ? 'outlined' : 'standard'}
      className={props.className ? props.className : 'field__input'}
      label={props.label ? props.label : ''}
      value={props.items.map(a => a.name).join(',')}
      margin="normal"
      SelectProps={{
        MenuProps: { disableScrollLock: true }
      }}
      data-cy={props.dataCy}
    >
      {props.selectValues.map(item => (
        <MenuItem key={item} value={item}>
          <Checkbox 
            checked={props.items.findIndex(a => a.isEnabled && a.name === item) > -1} 
            onChange={(event): void => selectCheckboxHandler(event, item)}
          />
          <ListItemText primary={item} />
        </MenuItem>
      ))}
    </TextField>
  );
};

export default CheckboxFormField;