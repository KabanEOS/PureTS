export class OpenIDCertificateKeys {
  keys: OpenIDCertificateKey[];
}

export interface OpenIDCertificateKey {
  kty: string;
  use: string;
  kid: string;
  x5t: string;
  n: string;
  e: string;
  x5c: string[];
}