import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';

import React from 'react';

import { ScrumForm } from '../ScrumForm/ScrumForm';

interface Props{
  open: boolean,
  onClose: ()=>void,
}
const ScrumAddModal = ({ open, onClose }:Props): JSX.Element => {
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Add new scrum</DialogTitle>
      <DialogContent>
        <ScrumForm onClose={onClose}/>
      </DialogContent>
    </Dialog>
  );
};

export default ScrumAddModal;

