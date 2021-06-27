import { IBaseModelAttached } from 'models/abstraction/base.interface';

import { ProjectFromDB } from 'models/project/project.model';

export interface ScrumData {
  task: string;
  project: ProjectFromDB;
  description: string;
  time: string;
  date: Date;
}

export interface ScrumSubmitData {
  task: string;
  project: string;
  description: string;
  time: string;
  date: Date;
}

export type ScrumFromDB = ScrumData & IBaseModelAttached;
