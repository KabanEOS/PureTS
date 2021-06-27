import { adalGraphPost, adalGraphGet } from 'framework/helpers/axios.methods';
import { authConfig } from 'plugins/level-1/authentication-azuread/adalConfig';
import { GRAPH_API_USERS_ENDPOINT } from 'plugins/level-1/authentication-azuread/api-handlers/graph-api.handler';

import { UserRole } from '../models/user.roles';

import { AppRoleAssignmentsResponse } from './models/appRoleResponse.model';
import { GraphAPIIntivationReponse } from './models/invitationResponse.model';

export const inviteExternalUserIntoAADOrganization = async (displayName: string, email: string, currentUrl: string
): Promise<GraphAPIIntivationReponse> => {
  const payload = {
    invitedUserDisplayName: displayName,
    invitedUserEmailAddress: email,
    inviteRedirectUrl: currentUrl, 
    sendInvitationMessage: false
  };

  const response = await adalGraphPost<unknown, GraphAPIIntivationReponse>('https://graph.microsoft.com/v1.0/invitations/', payload);
  return response.data;
};

export const getAssignedUserRoles = async (userId: string): Promise<UserRole[]> => {
  const response = await adalGraphGet<AppRoleAssignmentsResponse>(`${GRAPH_API_USERS_ENDPOINT}/${userId}/appRoleAssignments`);
  const appRoleAssignments = response.data.value;
  return appRoleAssignments.filter(ra => ra.resourceDisplayName === 'Swarmcheck PV3' && ra.principalId === userId).map(r => 
    r.appRoleId === 'bcc4fd2a-2414-4132-b05e-6cf76fdf4672' 
      ? UserRole.ExternalModerator 
      : UserRole.StandardUser
  );
};

export const assignUserRoleInApplication = async (userId: string, userRole: UserRole
): Promise<void> => {
  const appRoleId = userRole === UserRole.ExternalModerator 
    ? 'bcc4fd2a-2414-4132-b05e-6cf76fdf4672'
    : '16edaf48-8395-406c-8496-9b9aae11eb37';

  const payload = {
    principalId: userId,
    resourceId: authConfig.auth?.clientId,
    appRoleId
  };

  await adalGraphPost(`${GRAPH_API_USERS_ENDPOINT}/${userId}/appRoleAssignments`, payload);
};