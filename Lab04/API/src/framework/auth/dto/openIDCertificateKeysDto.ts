export class OpenIDCertificateKeys {
  keys: [IOpenIDCertificateKey];
}

export interface IOpenIDCertificateKey {
  kty: string;
  use: string;
  kid: string;
  x5t: string;
  n: string;
  e: string;
  x5c: [string];
}