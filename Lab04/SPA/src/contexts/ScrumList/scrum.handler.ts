import { adalApiDelete, adalApiGet, adalApiPost, adalApiPut } from 'framework/helpers/axios.methods';
import { ScrumData, ScrumFromDB, ScrumSubmitData } from 'models/scrum/scrum.model';

import { URL_SCRUMS } from 'shared/navigation/baseUrlHelper';


export const getScrumsFromDB = async (): Promise<ScrumFromDB[]> => {
  const response = await adalApiGet<ScrumFromDB[]>(URL_SCRUMS);
  return response.data;
};

export const postScrumsToDB = async (scrum: ScrumSubmitData): Promise<ScrumFromDB> => {
  const response = await adalApiPost<ScrumSubmitData,ScrumFromDB>(URL_SCRUMS,scrum);
  return response.data;
};

export const deleteScrumsFromDBbyId = async (scrumId: string): Promise<unknown> => {
  return adalApiDelete<unknown>(`${URL_SCRUMS}/${scrumId}`);
};

export const editScrumsFromDBbyId = async (scrumId: string, scrum: ScrumData): Promise<unknown> => {
  return adalApiPut<ScrumData,unknown>(`${URL_SCRUMS}/${scrumId}`, scrum);
};