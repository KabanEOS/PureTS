import { InvitationStatus } from './invitasionStatus.model';

export interface AADUserProfileFilterResponse { 
  value: AADUserProfile[];
  '@odata.nextLink'?: string;
}

export interface AADUserProfileResponse { 
  value: AADUserProfile;
}

export interface AADUserProfile { 
  id: string;
  displayName: string;
  mail: string;
  externalUserState: InvitationStatus;  
  externalUserStateChangeDateTime: Date;
  userType: string;
  userPrincipalName: string;
}