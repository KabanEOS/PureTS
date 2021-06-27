import { Response } from 'express';

import { ICurrentUser } from 'framework/auth/models/currentUser.model';
import { ExtendedRequest } from 'framework/extensions/extendedRequest';
import { IUser } from 'models/user/user.model';

import { userService } from 'services/user/user.service';

export const loggedIn = async (req: ExtendedRequest, res: Response): Promise<void> => {
  const currentUser = req.currentUser as ICurrentUser;
  if (!currentUser) {
    res.sendStatus(401);
    return;
  }
  const userProfile = await userService.upsertUser(currentUser.email);

  res.send(userProfile);
};
 
export const getUserProfile = async (req: ExtendedRequest, res: Response): Promise<void> => {
  const currentUser = req.currentUser as ICurrentUser;

  if (!currentUser) {
    res.sendStatus(401);
    return;
  }
  
  if (!currentUser.id) {
    const createdUser = await userService.saveUser(currentUser as unknown as IUser);
    res.send(createdUser);
    return;
  }

  res.send(currentUser);
};

