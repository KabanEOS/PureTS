import express from 'express';

import * as projectController from 'controllers/project.controller';

export const PROJECTS_URL = '/projects';

export const setupProjectRoutes = (app: express.Express): void => {
  // Get all projects
  app.get(PROJECTS_URL,
    projectController.getProjects
  );

  // Add project
  app.post(PROJECTS_URL,
    projectController.postProject
  );

  app.delete(`${PROJECTS_URL}/:id`,
    projectController.deleteProjectById
  );

  // Edit project with id for current user
  app.put(`${PROJECTS_URL}/:id`,
    projectController.editProjectById
  );
};