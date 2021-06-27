import { IBaseModelAttached } from 'models/abstraction/base.interface';

export interface IScrum {
  userId: string;
  task: string;
  project: string;
  description: string;
  time: string;
  date: Date;
}

export type IScrumAttached = IScrum & IBaseModelAttached;
