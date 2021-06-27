import express from 'express';

import { setupProjectRoutes } from 'routing-pipelines/project.pipelines';
import { setupScrumRoutes } from 'routing-pipelines/scrum.pipelines';
import { setupUserRoutes } from 'routing-pipelines/user.pipelines';

export const setupRoutes = (app: express.Express): void => {
  app.get('/', (req, res) => res.send('Welcome to Scrum Generator API.'));

  setupUserRoutes(app);
  setupScrumRoutes(app);
  setupProjectRoutes(app);
};