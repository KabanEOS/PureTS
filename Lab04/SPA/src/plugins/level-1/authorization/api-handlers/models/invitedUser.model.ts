import { InvitationStatus } from 'plugins/level-1/authentication-azuread/models/invitasionStatus.model';

export interface InvitedUser {
  aadId?: string;
  displayName: string; 
  email: string; 
  invitationRedeemUrl?: string;
  invitationStatus?: InvitationStatus;
  appRoles?: string[];
}