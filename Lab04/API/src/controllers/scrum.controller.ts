import { Response } from 'express';

import { ICurrentUser } from 'framework/auth/models/currentUser.model';
import { ExtendedRequest } from 'framework/extensions/extendedRequest';
import { scrumService } from 'services/scrum/scrum.service';
 
export const getScrumsForCurrentUser = async (req: ExtendedRequest, res: Response): Promise<void> => {
  const currentUser = req.currentUser as ICurrentUser;
  const scrums = await scrumService.getScrumsByUserId(currentUser.id);
  res.send(scrums);
};

export const postScrumsForCurrentUser = async (req: ExtendedRequest, res: Response): Promise<void> => {
  const currentUser = req.currentUser as ICurrentUser;
  const data = req.body;
  const scrum = await scrumService.postScrumsByUserId(data, currentUser.id);
  res.status(201).send(scrum);
};

export const deleteScrumsForCurrentUserById = async (req: ExtendedRequest, res: Response): Promise<void> => {
  const currentUser = req.currentUser as ICurrentUser;
  const scrumId = req.params.id;
  const result = scrumService.deleteScrumsByScrumId(scrumId, currentUser.id);
  result
    .then(() => res.sendStatus(204))
    .catch(() => res.sendStatus(400));
};

export const editScrumsForCurrentUserById = async (req: ExtendedRequest, res: Response): Promise<void> => {
  const currentUser = req.currentUser as ICurrentUser;
  const scrumId = req.params.id;
  const data = req.body;
  const result = scrumService.editScrumsByScrumId(scrumId, data, currentUser.id);
  result
    .then(() => res.sendStatus(204))
    .catch(() => res.sendStatus(400));
};

