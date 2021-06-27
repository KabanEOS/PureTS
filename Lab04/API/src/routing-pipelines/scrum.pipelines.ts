import express from 'express';

import * as scrumController from 'controllers/scrum.controller';

export const SCRUMS_URL = '/scrums';

export const setupScrumRoutes = (app: express.Express): void => {
  // Get all scrums for current user
  app.get(SCRUMS_URL,
    scrumController.getScrumsForCurrentUser
  );

  // Add scrum for current user
  app.post(SCRUMS_URL,
    scrumController.postScrumsForCurrentUser
  );

  // Delete scrum with id for current user
  app.delete(`${SCRUMS_URL}/:id`,
    scrumController.deleteScrumsForCurrentUserById
  );

  // Edit scrum with id for current user
  app.put(`${SCRUMS_URL}/:id`,
    scrumController.editScrumsForCurrentUserById
  );
};
