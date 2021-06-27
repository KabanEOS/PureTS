import { IBaseModelAttached } from 'models/abstraction/base.interface';

export interface IProject {
  shortName: string;
  fullName: string;
  isActive: boolean;
}

export type IProjectAttached = IProject & IBaseModelAttached;
