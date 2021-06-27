import mongoose, { Document, Schema } from 'mongoose';

import { IUser, IUserAttached } from './user.model';
import { UserStatus } from './user.status';

export const UserCollectionName = 'users';

const UserSchema = new Schema({
  aadUserId: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  displayName: {
    type: String
  },
  lastLoggedIn: {
    type: Date,
  },
  status: {
    type: UserStatus
  }
});

export interface IUserDocument extends IUser, Document {}

export const UserCollection = 
mongoose.model<IUserDocument>(UserCollectionName, UserSchema);

export const mapUserToAttachedUser = (user: IUserDocument): IUserAttached => {
  return {
    id: user.id,
    aadUserId: user.aadUserId,
    email: user.email,
    displayName: user.displayName,
    lastLoggedIn: user.lastLoggedIn,
    status: user.status
  };
};
