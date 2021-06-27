import { Button, Tooltip } from '@material-ui/core';
import React, { FC } from 'react';

export const AddButton:FC = () => {
  return (
    <div className="scrumAddForm__buttonBox">
      <Tooltip title="Add" aria-label="add">
        <Button type="submit" color="primary">
          Add
        </Button>
      </Tooltip>
    </div>
  );
};