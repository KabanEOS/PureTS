export class AuthConfig {
  authority = 'https://login.microsoftonline.com/b5e4f771-c0c7-4e37-90f6-d55402b5c172';
  issuer = 'https://sts.windows.net/b5e4f771-c0c7-4e37-90f6-d55402b5c172/';
  audience: string[] = ['ec8a84a4-5230-496a-b6ed-ccc13cb09864', 'c5f75801-a044-4cec-9bcd-7479567b20d3'];
}

export interface IAuthConfig {
  authority: string;
  issuer: string;
  audience: string[];
  spaEnterpriseObjectId: string;
}

export const authConfig: IAuthConfig = {
  authority: 'https://login.microsoftonline.com/b5e4f771-c0c7-4e37-90f6-d55402b5c172',
  issuer: 'https://sts.windows.net/b5e4f771-c0c7-4e37-90f6-d55402b5c172/',
  audience: ['0d81bc9d-5e49-4d7e-8906-62e9639723d8', 'c5f75801-a044-4cec-9bcd-7479567b20d3'], 
  spaEnterpriseObjectId: '71ad302c-1ef1-4061-9452-66321d0406d8',
};