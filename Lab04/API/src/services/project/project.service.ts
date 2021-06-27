import { IProject, IProjectAttached } from 'models/projects/project.model';
import { IProjectDocument, mapProjectToAttachedproject, ProjectCollection } from 'models/projects/project.schema';

class ProjectService {
  getProjects = async (): Promise<IProjectAttached[]> => {
    const projects = await ProjectCollection.find();
    return projects.map(s => mapProjectToAttachedproject(s));
  };

  postProject = async (project: IProject): Promise<IProjectAttached> => {
    const data = await ProjectCollection.create(project);
    return mapProjectToAttachedproject(data);
  };

  deleteProjectById = async (projectId: string): Promise<void> => {
    return await ProjectCollection.deleteOne({ _id: projectId });
  };

  editProjectById = async (projectId: string, data: IProject ): Promise<IProjectDocument> => {
    return await ProjectCollection.findOneAndUpdate(
      { _id: projectId },
      data,
      { returnOriginal: false }
    );
  };
}

export const projectService = new ProjectService();