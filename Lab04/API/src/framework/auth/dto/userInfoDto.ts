import { UserRole } from '../models/role.enum';

export class UserInfoDto {
  unique_name: string;
  upn: string;
  uti: string;
  ver: string;
  email?: string;
  roles?: UserRole[];
}