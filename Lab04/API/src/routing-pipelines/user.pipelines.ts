import express from 'express';

import * as userController from 'controllers/user.controller';

export const USERS_URL = '/users';
export const LOGGED_IN_URL = '/loggedIn';
export const CURRENT_USER_URL = '/current';
export const USER_SETTINGS = '/settings';

export const setupUserRoutes = (app: express.Express): void => {
  //set current user
  app.get(USERS_URL + CURRENT_USER_URL,
    userController.getUserProfile
  );
  //user login handler
  app.put(USERS_URL + CURRENT_USER_URL + LOGGED_IN_URL,
    userController.loggedIn
  );
};