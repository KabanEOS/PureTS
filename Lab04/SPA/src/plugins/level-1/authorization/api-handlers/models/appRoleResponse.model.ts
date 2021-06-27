export interface AppRoleAssignmentsResponse { 
  value: AppRoleResponse[];
}

export interface AppRoleResponse { 
  id: string;
  creationTimestamp: Date;
  principalDisplayName: string;
  principalId: string;
  principalType: string;
  resourceDisplayName: string;
  appRoleId: string;
}