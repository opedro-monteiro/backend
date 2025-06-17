import { Role } from "@prisma/client";

export type AuthJwtPayload = {
  id: string
  role: Role
  email: string
  tenantId: string
};
