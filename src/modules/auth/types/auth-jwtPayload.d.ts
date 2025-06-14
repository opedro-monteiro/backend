import { Role } from "@prisma/client";

export type AuthJwtPayload = {
  tenantId: string;
  sub: string;
  role: Role
};
