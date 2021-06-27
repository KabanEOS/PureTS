import { IUser, IUserAttached } from 'models/user/user.model';
import { mapUserToAttachedUser, UserCollection } from 'models/user/user.schema';

class UserService {

  getUserById = async (userId: string): Promise<IUserAttached | undefined> => {
    const user = await UserCollection.findById(userId);
    return user ? mapUserToAttachedUser(user) : undefined;
  }

  getUserByAADUserId = async (aadUserId: string): Promise<IUserAttached | undefined> => {
    const user = await UserCollection.findOne({ aadUserId });
    return user ? mapUserToAttachedUser(user) : undefined;
  }

  upsertUser = async(email: string): Promise<IUserAttached> => {
    const filter = { email };
    const update = { lastLoggedIn: new Date() };
    const savedUser = await UserCollection.findOneAndUpdate(
      filter,
      { $set : update },
      { new: true, upsert: true }
    );
    return mapUserToAttachedUser(savedUser);
  }

  saveUser = async (user: IUser): Promise<IUserAttached> => {
    const createdUser = await UserCollection.findOneAndUpdate({ email: user.email }, { ...user }, { upsert: true });
    return mapUserToAttachedUser(createdUser);
  };

}

export const userService = new UserService();