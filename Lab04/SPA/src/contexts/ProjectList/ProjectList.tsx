import React, { createContext, useContext, useEffect, useState } from 'react';

import { ProjectData, ProjectFromDB } from 'models/project/project.model';

import { deleteProjectFromDBbyId, getProjectsFromDB, postProjectToDB, putProjectFromDBbyId } from './project.handler';

interface props {
  children?: React.ReactNode;
}

interface ProjectListContextValue {
  projects: ProjectFromDB[];
  handleSubmit: (project: ProjectData) => Promise<void> | (()=>void);
  handleDelete: (id: string) => Promise<void> | (()=>void);
  handleSetIsActive: (id: string, active: boolean) => Promise<void> | (()=>void);
}

const ProjectListContext = createContext<ProjectListContextValue>({
  projects: [],
  handleSubmit: () => () => {},
  handleDelete: () => () => {},
  handleSetIsActive: () => () => {},
});

const ProjectListProvider = ({ children }:props): JSX.Element => {

  const [projects, setProjects] = useState<ProjectFromDB[]>([]);

  useEffect(() => {
    const downloadProjects = async () => {
      const data = await getProjectsFromDB();
      setProjects(data);
    };
    downloadProjects();
  }, []);

  const handleDelete = async (id: string): Promise<void> => {
    deleteProjectFromDBbyId(id)
      .then((res) => {
        setProjects(projects.filter(project => project.id !== id));
      })
      .catch((err) => {
        //TODO Think of an error handling strategy
      });
  };

  const handleSubmit = async (project: ProjectData) => {
    const data = await postProjectToDB(project);
    setProjects(() => [
      ...projects,
      data
    ]);
  };

  const handleSetIsActive = async (id: string, active: boolean) => {
    const data = await putProjectFromDBbyId(id, { isActive: active });
    const newArr = [...projects];
    const index = newArr.findIndex((project) => project.id === id);
    newArr[index].isActive = active;
    setProjects(newArr);
  };

  return (
    <ProjectListContext.Provider value={{
      projects, 
      handleSubmit, 
      handleDelete,
      handleSetIsActive,
    }}>
      {children}
    </ProjectListContext.Provider>
  );
};

export default ProjectListProvider;

export const useProjectList = (): ProjectListContextValue => {
  const context = useContext(ProjectListContext);
  if (!context) throw new Error('Context must be used within <ProjectListProvider/>');
  return context;
};
