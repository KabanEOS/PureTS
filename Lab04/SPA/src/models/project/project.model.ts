interface IBaseModelAttached {
  readonly id: string;
}

export interface ProjectData {
  shortName: string,
  fullName: string,
  isActive: boolean,
}

export interface ProjectEditableData {
  shortName?: string,
  fullName?: string,
  isActive?: boolean,
}

export type ProjectFromDB = ProjectData & IBaseModelAttached;
