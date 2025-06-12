export class User {
  id: string;
  tenantId: string;
  name: string;
  email: string;
  password: string;
  refreshToken?: string;
  role: 'ADMIN' | 'USER' | 'GUEST';
  createdAt: Date;
  updatedAt: Date;
}