import { ExtendedRequest } from 'framework/extensions/extendedRequest';
import { setUserRole } from 'helpers/role.helper';
import { userService } from 'services/user/user.service';

import { AuthHelper } from './helpers/auth.helper';
import { CurrentUser } from './models/currentUser.model';
import { UserRole } from './models/role.enum';

export class AuthService {
  constructor(
    private readonly authHelper: AuthHelper,
  ) {}
  
  async validateTokenIfPresent(request: ExtendedRequest): Promise<void> {
    //TEMP WORKAROUND!!!
    if (request.headers.authorization?.startsWith('Bearer Custom')) {
      const userEmail = request.headers.authorization.replace('Bearer Custom: ', '');
      const currentUser = new CurrentUser(
        userEmail, 
        userEmail, 
        userEmail, 
        userEmail,    
        [UserRole.StandardUser]
      );
      request.isAuthenticated = (): boolean => true;
      request.currentUser = currentUser;

      return;
    }

    if (!request.headers.authorization?.startsWith('Bearer')) return;

    const aadUserId = await this.authHelper.decodeAndValidateToken(request.headers.authorization);

    if (aadUserId) {
      const graphADUser = await this.authHelper.getUserFromGraphAPI(aadUserId, request.headers.authorization);
      
      const dbUser = await userService.getUserByAADUserId(aadUserId);

      const roles = graphADUser.userRoles.map((roleId: string) => setUserRole(roleId));
      const currentUser = new CurrentUser(
        dbUser?.id, 
        aadUserId, 
        graphADUser.mail || graphADUser.userPrincipalName, 
        graphADUser.displayName,    
        roles
      );
      request.isAuthenticated = (): boolean => true;
      request.currentUser = currentUser;

    }
    request.isAuthenticated = (): boolean => false;
  }

  async authTestUser(request: ExtendedRequest): Promise<void> {
    request.isAuthenticated = (): boolean => true;
    request.currentUser = new CurrentUser('1', '1', 'testmod@optimumpareto.com', 'test mod', [UserRole.Admin, UserRole.InternalModerator]);
  }
}