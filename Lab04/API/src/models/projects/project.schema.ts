import mongoose, { Document, Schema } from 'mongoose';

import { IProject, IProjectAttached } from './project.model';

export const ProjectCollectionName = 'projects';

const ProjectSchema = new Schema({
  shortName: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true,
  },
});

export interface IProjectDocument extends IProject, Document {}

export const ProjectCollection = mongoose.model<IProjectDocument>(
  ProjectCollectionName,
  ProjectSchema
);

export const mapProjectToAttachedproject = (
  project: IProjectDocument
): IProjectAttached => {
  return {
    id: project.id,
    shortName: project.shortName,
    fullName: project.fullName,
    isActive: project.isActive
  };
};
