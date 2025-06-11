import { Role } from '@prisma/client';

export interface UserPayload {
  email?: string;
  id: string;
  role: Role;
  tenantId?: string;
  iat?: number;
  exp?: number;
}
