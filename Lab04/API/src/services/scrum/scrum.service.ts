import { IScrum, IScrumAttached } from 'models/scrum/scrum.model';
import { IScrumDocument, mapScrumToAttachedScrum, ScrumCollection } from 'models/scrum/scrum.schema';

class ScrumService {
  getScrumsByUserId = async (userId: string): Promise<IScrumAttached[]> => {
    const scrums = await ScrumCollection.find({ userId }).populate('project');
    return scrums.map(s => mapScrumToAttachedScrum(s));
  };

  postScrumsByUserId = async (scrum: IScrum ,userId: string): Promise<IScrumAttached> => {
    scrum.userId = userId;
    const data = await (await (ScrumCollection.create(scrum)))
      .populate('project')
      .execPopulate();
    return mapScrumToAttachedScrum(data);
  };

  deleteScrumsByScrumId = async (scrumId: string ,userId: string): Promise<void> => {
    return await ScrumCollection.deleteOne({ _id: scrumId, userId });
  };

  editScrumsByScrumId = async (scrumId: string, data: IScrum, userId: string): Promise<IScrumDocument> => {
    return await ScrumCollection.findOneAndUpdate(
      { _id: scrumId, userId },
      data,
      { returnOriginal: false }
    );
  };
}

export const scrumService = new ScrumService();