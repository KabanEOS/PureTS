import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';

import { FilterOptionsState } from '@material-ui/lab/useAutocomplete';

import { Field } from 'formik';

import React, { Dispatch, SetStateAction, useEffect } from 'react';

import { getProjectsFromDB, postProjectToDB } from 'contexts/ProjectList/project.handler';

import { ProjectData } from 'models/project/project.model';

interface props {
  value: ProjectsOptionType | null;
  setValue: Dispatch<SetStateAction<ProjectsOptionType | null>>;
}

const filter = createFilterOptions<ProjectsOptionType>();

export default function SelectProjectField( { value, setValue }: props): JSX.Element {
  //const [value, setValue] = React.useState<ProjectsOptionType | null>(null);
  const [open, toggleOpen] = React.useState(false);

  const [projects, setProjects] = React.useState<ProjectsOptionType[]>([]);

  useEffect(() => {
    const downloadProjects = async () => {
      const data = await getProjectsFromDB();
      setProjects(data);
    };
    downloadProjects();
  }, []);

  const handleClose = () => {
    setDialogValue({
      shortName: '',
      fullName: '',
    });
    toggleOpen(false);
  };

  const [dialogValue, setDialogValue] = React.useState({
    shortName: '',
    fullName: '',
  });

  const handleSubmit = async () => {
    const projectData = {
      shortName: dialogValue.shortName,
      fullName: dialogValue.fullName,
      isActive: true,
    };
    const data = await postProjectToDB(projectData);
    setProjects(projects => [
      ...projects,
      data
    ]);
    setValue(data);
    handleClose();
  };

  return (
    <>
      <Field
        name="project"
        component={Autocomplete}
        value={value}
        onChange={(event: any, newValue: ProjectsOptionType) => {
          if (typeof newValue === 'string') {
            // timeout to avoid instant validation of the dialog's form.
            setTimeout(() => {
              toggleOpen(true);
              setDialogValue({
                shortName: newValue,
                fullName: '',
              });
            });
          } else if (newValue && newValue.inputValue) {
            toggleOpen(true);
            setDialogValue({
              shortName: newValue.inputValue,
              fullName: '',
            });
          } else {
            setValue(newValue);
          }
        }}
        filterOptions={(options: ProjectsOptionType[], params: FilterOptionsState<ProjectsOptionType>) => {
          const filtered = filter(options, params) as ProjectsOptionType[];

          if (params.inputValue !== '') {
            filtered.push({
              id:'',
              inputValue: params.inputValue,
              shortName: `Add "${params.inputValue}"`,
              fullName: '',
              isActive: true
            });
          }

          return filtered;
        }}
        options={projects}
        getOptionLabel={(option: ProjectsOptionType) => {
          if (typeof option === 'string') {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.shortName;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        renderOption={(option: ProjectsOptionType) => option.shortName}
        style={{ width: 300 }}
        freeSolo
        renderInput={(params: JSX.IntrinsicAttributes & TextFieldProps) => (
          <TextField {...params} label="Projects" variant="outlined"/>
        )}
      />


      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Dodaj nowy projekt</DialogTitle>
        <DialogContent>
          <DialogContentText>
              Dodaj nowy projekt
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="shortName"
            value={dialogValue.shortName}
            onChange={(event) => setDialogValue({ ...dialogValue, shortName: event.target.value })}
            label="shortName"
            type="text"
          />
          <TextField
            margin="dense"
            id="fullName"
            value={dialogValue.fullName}
            onChange={(event) => setDialogValue({ ...dialogValue, fullName: event.target.value })}
            label="fullName"
            type="text"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={ handleClose } color="primary">
              Cancel
          </Button>
          <Button onClick={ handleSubmit } color="primary">
              Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

type ProjectsOptionType = ProjectData & {id: string, inputValue?: string;}