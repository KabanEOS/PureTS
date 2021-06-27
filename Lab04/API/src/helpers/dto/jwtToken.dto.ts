export class JwtTokenHeader {
  typ: string;
  alg: string;
  x5t: string;
  kid: string;
}

export class JwtTokenPayload {
  acr: string;
  aio: string;
  amr: [string];
  appid: string;
  appidacr: string;
  aud: string;
  exp: string;
  family_name: string;
  given_name: string;
  iat: number;
  ipaddr: string;
  iss: string;
  name: string;
  nbf: number;
  oid: string;
  scp: string;
  sub: string;
  tid: string;
  unique_name: string;
  upn: string;
  uti: string;
  ver: string;
  email?: string;
  roles?: string[];
}