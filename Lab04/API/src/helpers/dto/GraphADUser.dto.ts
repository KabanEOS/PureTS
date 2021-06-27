import { DefaultLanguageCodes } from 'models/translation/translation.enums';

export class GraphADUser {
  id: string;
  mail?: string;
  userPrincipalName: string;
  givenName: string;
  surname?: string;
  displayName?: string;
  preferredLanguage?: DefaultLanguageCodes;
  userRoles: string[];
}

export class GraphADUsersResponse {
  '@odata.nextLink': string;
  value: GraphADUser[];
}