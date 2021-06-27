export interface AppRoleAssignmentsResponse { 
  value: AppRoleResponse[];
}

export interface AppRoleResponse { 
  creationTimestamp: Date;
  principalId: string;
  resourceId: string;
  appRoleId: string;
}