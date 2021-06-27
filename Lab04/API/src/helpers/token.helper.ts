
import axios from 'axios';

import * as jwt from 'jwt-simple';

import { authConfig } from 'framework/auth/auth.config';
import { CacheService } from 'framework/cache/cache.service';

import { getCertificate } from './certificate.helper';
import { AccessTokenResponseDto } from './dto/accessTokenResponse.dto';
import { AppRoleAssignmentsResponse } from './dto/addRoleAssignment.dto';
import { GraphADUser, GraphADUsersResponse } from './dto/GraphADUser.dto';
import { JwtTokenHeader, JwtTokenPayload } from './dto/jwtToken.dto';

export const TOKEN_ENDPOINT = '/oauth2/v2.0/token';
export const GRAPH_API_ENDPOINT = 'https://graph.microsoft.com/v1.0';
export const GRAPH_API_USERS_ENDPOINT = GRAPH_API_ENDPOINT + '/users';
export const APP_ROLE_ASSIGNMENTS_PART = 'appRoleAssignments';

export const GRANT_TYPE_BEARER = 'urn:ietf:params:oauth:grant-type:jwt-bearer';
export const AUTH_SCOPE = 'user.read';
export const ON_BEHALF_OF = 'on_behalf_of';
export const CONTENT_TYPE_FORM_ENCODED = 'application/x-www-form-urlencoded';

const GRAPH_AD_USER_CACHE_KEY = 'GraphADUser_';

export class TokenHelper {
  constructor(private cacheService: CacheService) {}

  getCachedCertificate = async (x5t: string): Promise<string> => {
    return this.cacheService.wrap('AADCertificate_' + x5t, () => getCertificate(x5t));
  };
  
  
  validateAADToken = (decodedToken: JwtTokenPayload): boolean => {
    return authConfig.issuer === decodedToken.iss 
        && authConfig.audience.indexOf(decodedToken.aud) >= 0 
        && Date.now() / 1000 < parseInt(decodedToken.exp) 
      ? true
      : false;
  };
  
  decodeAndValidateAADToken = async(authorizationHeader: string): Promise<string> => {
    const token = authorizationHeader.substring(7, authorizationHeader.length);
    
    const base64DecodedHeader = Buffer.from(token.split('.')[0], 'base64').toString();
    const headerObject = JSON.parse(base64DecodedHeader) as JwtTokenHeader;
    const publicKey = await this.getCachedCertificate(headerObject.x5t);
  
    const decodedToken = jwt.decode(token, publicKey) as JwtTokenPayload;
  
    if (this.validateAADToken(decodedToken)) 
      return decodedToken.oid;
    else 
      return undefined;
  };

  /** 
   * Retrieves access token on behalf of currently authenticated user. 
   * Caches result.
   */
  getOnBehalfOfAccessTokenCached = async(aadUserId: string, authorizationHeader: string): Promise<string> => {
    return this.cacheService.wrap('OBO_AccessToken_' + aadUserId, () => {
      return this.getOnBehalfOfAccessToken(authorizationHeader);
    });
  }
  
  /** Retrieves access token on behalf of currently authenticated user. */
  getOnBehalfOfAccessToken = async(authorizationHeader: string): Promise<string> => {
  
    const authorizeUrl = authConfig.authority + TOKEN_ENDPOINT;
    const postParams = `
    client_id=${process.env.AADCLIENTID}
    &scope=${AUTH_SCOPE}
    &grant_type=${GRANT_TYPE_BEARER}
    &client_secret=${process.env.AADCLIENTSECRET}
    &requested_token_use=${ON_BEHALF_OF}
    &assertion=${authorizationHeader.substring(7)}`;
  
    const accessTokenResponse = await axios.post<AccessTokenResponseDto>(authorizeUrl, postParams, {
      headers: { 'Content-Type': CONTENT_TYPE_FORM_ENCODED }
    });
  
    const accessToken = accessTokenResponse.data.access_token;
    return accessToken;
  };
  
  /** 
    * Downloads current user details from Microsoft Graph. 
    * Caches result.
    */
  getUserFromGraphAPICached = async(aadUserId: string, authorizationHeader: string
  ): Promise<GraphADUser> => {
    return this.cacheService.wrap<GraphADUser>(GRAPH_AD_USER_CACHE_KEY + aadUserId, () => {
      return this.getUserFromGraphAPI(aadUserId, authorizationHeader);
    });
  };
  
  /** Downloads current user details from Microsoft Graph. */
  getUserFromGraphAPI = async(aadUserId: string, authorizationHeader: string
  ): Promise<GraphADUser> => {
  
    const accessToken = await this.getOnBehalfOfAccessTokenCached(aadUserId, authorizationHeader);
    const headers = { Authorization: `Bearer ${accessToken}` };
  
  
    //get user details
    const graphUserEndpoint = GRAPH_API_USERS_ENDPOINT + '/' + aadUserId;
    const graphADUserResponse = await axios.get<GraphADUser>(graphUserEndpoint, { headers });
    const graphADUser = graphADUserResponse.data;
  
    //get app role assignments
    const areEndpoint = GRAPH_API_USERS_ENDPOINT + '/' + aadUserId + '/' + APP_ROLE_ASSIGNMENTS_PART;
    const areResponse = await axios.get<AppRoleAssignmentsResponse>(areEndpoint, { headers });
    const appRoleAssignments = areResponse.data.value;
  
    //match roleIDs with application roles
    const filteredUserRoles = appRoleAssignments.filter(
      ara => ara.resourceId === authConfig.spaEnterpriseObjectId && ara.principalId === aadUserId);
  
    graphADUser.userRoles = filteredUserRoles.map(fur => fur.appRoleId);
    return graphADUser;
  };
  
  getAllAADUsers = async (authorizationHeader: string): Promise<GraphADUser[]> => {
    const accessToken = await this.getOnBehalfOfAccessToken(authorizationHeader);
    const headers = { Authorization: `Bearer ${accessToken}` };
  
    let response = await axios.get<GraphADUsersResponse>(GRAPH_API_USERS_ENDPOINT, { headers });
  
    let users = [...response.data.value];
  
    while (response.data['@odata.nextLink']) {
      response = await axios.get<GraphADUsersResponse>(response.data['@odata.nextLink'], { headers });
      users = [...users, ...response.data.value];
    }
  
    return users;
  };

}

