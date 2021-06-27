import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button , TextField } from '@material-ui/core';

import React from 'react';

import { useProjectList } from 'contexts/ProjectList/ProjectList';


interface Props{
  open: boolean,
  onClose: ()=>void,
}

const AddProjectModal = ({ open, onClose }:Props): JSX.Element => {
  const { handleSubmit } = useProjectList();
  const [dialogValue, setDialogValue] = React.useState({
    shortName: '',
    fullName: '',
  });

  const handleClose = () => {
    setDialogValue({
      shortName: '',
      fullName: '',
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Dodaj nowy projekt</DialogTitle>
      <DialogContent>
        <DialogContentText>
              Dodaj nowy projekt
        </DialogContentText>
        <TextField
          autoFocus
          id="shortName"
          value={dialogValue.shortName}
          onChange={(event) => setDialogValue({ ...dialogValue, shortName: event.target.value })}
          label="shortName"
          type="text"
        />
        <TextField
          id="fullName"
          value={dialogValue.fullName}
          onChange={(event: { target: { value: any; }; }) => 
            setDialogValue({ ...dialogValue, fullName: event.target.value })}
          label="fullName"
          type="text"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={ handleClose } color="primary">
              Cancel
        </Button>
        <Button 
          onClick={() => {handleSubmit({
            shortName: dialogValue.shortName,
            fullName: dialogValue.fullName,
            isActive: true,
          }); handleClose();} } 
          color="primary">
              Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddProjectModal;
