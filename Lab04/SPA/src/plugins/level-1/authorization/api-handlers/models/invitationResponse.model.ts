import { InvitationStatus } from 'plugins/level-1/authentication-azuread/models/invitasionStatus.model';

export interface GraphAPIIntivationReponse {
  id: string;
  inviteRedeemUrl: string;
  invitedUserDisplayName: string;
  invitedUserEmailAddress: string;
  sendInvitationMessage: boolean;
  inviteRedirectUrl: string;
  status: InvitationStatus;
  invitedUser: { 
    id: string;
  };
}