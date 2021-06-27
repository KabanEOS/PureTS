import mongoose, { Document, Schema } from 'mongoose';

import { IScrum, IScrumAttached } from './scrum.model';

export const ScrumCollectionName = 'scrum_items';

const ScrumSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  task: {
    type: String,
    required: true,
  },
  project: {
    type: Schema.Types.ObjectId,
    ref: 'projects',
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

export interface IScrumDocument extends IScrum, Document {}

export const ScrumCollection = mongoose.model<IScrumDocument>(
  ScrumCollectionName,
  ScrumSchema
);

export const mapScrumToAttachedScrum = (
  scrum: IScrumDocument
): IScrumAttached => {
  return {
    id: scrum.id,
    userId: scrum.userId,
    task: scrum.task,
    project: scrum.project,
    description: scrum.description,
    time: scrum.time,
    date: scrum.date,
  };
};
