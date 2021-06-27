/* eslint-disable react/jsx-key */
import {
  Button, 
  List, 
  ListItem, 
  ListItemSecondaryAction, 
  ListItemText, 
  Paper, 
  Switch 
} from '@material-ui/core';

import React, { useState } from 'react';

import { useProjectList } from 'contexts/ProjectList/ProjectList';

import AddProjectModal from './components/AddProjectModal';


const ScrumProjectsPage = (): JSX.Element => {
  const { projects, handleSubmit, handleDelete, handleSetIsActive } = useProjectList();
  const [addProjectModalOpen, setAddProjectModalOpen] = useState(false);

  return (
    <div style={{ textAlign: 'center', width: '40vw' }}>
      <Paper>
        <Button
          onClick={() => setAddProjectModalOpen(true)}
          variant="contained"
          color="primary"
          className="scrum-table__addButton"
        >
          Add
        </Button>
        <AddProjectModal open={addProjectModalOpen} onClose={() => {setAddProjectModalOpen(false);}} />
        <List>
          {projects
            .map((proj) => 
              <ListItem key={proj.id} divider>
                <ListItemText
                  primary={proj.shortName}
                  secondary={proj.fullName}
                />
                <ListItemSecondaryAction>
                  <Switch
                    edge="end"
                    onChange={() => handleSetIsActive(proj.id, !proj.isActive)}
                    checked={proj.isActive}
                    color="primary"
                  />
                </ListItemSecondaryAction>
              </ListItem>
            )}
        </List>
      </Paper>
    </div>
  );
};

export default ScrumProjectsPage;
