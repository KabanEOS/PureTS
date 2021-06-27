import { Response } from 'express';

import { ExtendedRequest } from 'framework/extensions/extendedRequest';
import { projectService } from 'services/project/project.service';
 
export const getProjects = async (req: ExtendedRequest, res: Response): Promise<void> => {
  const projects = await projectService.getProjects();
  res.send(projects);
};

export const postProject = async (req: ExtendedRequest, res: Response): Promise<void> => {
  const data = req.body; 
  const project = await projectService.postProject(data);
  res.status(201).send(project);
};

export const deleteProjectById = async (req: ExtendedRequest, res: Response): Promise<void> => {
  const projectId = req.params.id;
  const result = projectService.deleteProjectById(projectId);
  result
    .then(() => res.sendStatus(204))
    .catch(() => res.sendStatus(400));
};

export const editProjectById = async (req: ExtendedRequest, res: Response): Promise<void> => {
  const projectId = req.params.id;
  const data = req.body;
  const result = projectService.editProjectById(projectId, data);
  result
    .then(() => res.sendStatus(204))
    .catch(() => res.sendStatus(400));
};