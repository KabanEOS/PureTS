import { adalApiDelete, adalApiGet, adalApiPost, adalApiPut } from 'framework/helpers/axios.methods';
import { URL_PROJECTS } from 'shared/navigation/baseUrlHelper';

import { ProjectData, ProjectFromDB, ProjectEditableData } from '../../models/project/project.model';

export const getProjectsFromDB = async (): Promise<ProjectFromDB[]> => {
  const response = await adalApiGet<ProjectFromDB[]>(URL_PROJECTS);
  return response.data;
};

export const postProjectToDB = async (project: ProjectData): Promise<ProjectFromDB> => {
  const response = await adalApiPost<ProjectData,ProjectFromDB>(URL_PROJECTS, project);
  return response.data;
};

export const deleteProjectFromDBbyId = async (projectId: string): Promise<unknown> => {
  return adalApiDelete<unknown>(`${URL_PROJECTS}/${projectId}`);
};

export const putProjectFromDBbyId = 
  async (projectId: string, data: ProjectEditableData): Promise<ProjectFromDB> => {
    const response = await adalApiPut<ProjectEditableData, ProjectFromDB>(`${URL_PROJECTS}/${projectId}`, data);
    return response.data;
  };