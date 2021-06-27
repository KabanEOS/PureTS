import { AuthConfig } from 'framework/auth/auth.config';

import { TokenHelper } from 'helpers/token.helper';

export class AuthHelper {

  constructor(
    private readonly authConfig: AuthConfig,
    private readonly tokenHelper: TokenHelper
  ) {}

  public async decodeAndValidateToken (authorizationHeader: string): Promise<string> {
    return await this.tokenHelper.decodeAndValidateAADToken(authorizationHeader);
  }

  public async getUserFromGraphAPI (aadUserId: string, authorizationHeader: string): Promise<any> {
    return await this.tokenHelper.getUserFromGraphAPICached(aadUserId, authorizationHeader);
  }
}