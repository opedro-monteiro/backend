import { Role } from '@prisma/client';

export interface UserToken {
  token: string;
  id: string;
  role: Role;
  // adminPermissions: AdminPermission[]; TODO: CRIAR
}
