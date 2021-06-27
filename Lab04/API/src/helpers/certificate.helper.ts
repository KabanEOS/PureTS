import axios from 'axios';

import { authConfig } from 'framework/auth/auth.config';

import { OpenIDCertificateKeys } from './dto/openIDCertificateKeys.dto';
import { OpenIDConfiguration } from './dto/openIDConfigration.dto';

export const convertCertificate = (cert: string): string => {
  const beginCert = '-----BEGIN CERTIFICATE-----';
  const endCert = '-----END CERTIFICATE-----';
      
  cert = cert.replace('\n', '');
  cert = cert.replace(beginCert, '');
  cert = cert.replace(endCert, '');
      
  let result = beginCert;
  while (cert.length > 0) {
          
    if (cert.length > 64) {
      result += '\n' + cert.substring(0, 64);
      cert = cert.substring(64, cert.length);
    }
    else {
      result += '\n' + cert;
      cert = '';
    }
  }
      
  if (result[result.length ] !== '\n') result += '\n';
    
  result += endCert + '\n';
  return result;
};
  
export const getCertificate = async (x5t: string): Promise<string> => {
  const openIdConfigurationResponse = await axios.get<OpenIDConfiguration>(
    authConfig.authority + '/.well-known/openid-configuration');
  
  const certificatesResponse = await axios.get<OpenIDCertificateKeys>(
    openIdConfigurationResponse.data.jwks_uri);
      
  const matchingKey = certificatesResponse.data.keys.find(k => k.x5t === x5t);
  if (!matchingKey || matchingKey?.x5c.length === 0)
    throw new Error('Unknown certificate: ' + x5t);
  
  return convertCertificate(matchingKey.x5c[0]);
};