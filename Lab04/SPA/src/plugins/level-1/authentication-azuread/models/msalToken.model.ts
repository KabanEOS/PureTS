export interface MsalToken {
  cachedAt: string;
  clientId: string;
  credentialType: CredentialType;
  environment: string;
  expiresOn: string;
  extendedExpiresOn: string;
  homeAccountId: string;
  realm: string;
  secret: string;
  target: string;
}

export enum CredentialType {
  IdToken = 'IdToken',
  RefreshToken = 'RefreshToken',
  AccessToken = 'AccessToken'
}