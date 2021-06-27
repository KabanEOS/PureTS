export type GraphAPIUsersResponse = {
  value: GraphAPIUser[];
  '@odata.nextLink': string;
}

export type GraphAPIUser = {
  id: string;
  businessPhones: string[];
  displayName: string;
  givenName: string;
  jobTitle: string;
  mail: string;
  mobilePhone: string;
  officeLocation: string;
  preferredLanguage: string;
  surname: string;
  userPrincipalName: string;
  roles: string[];
};