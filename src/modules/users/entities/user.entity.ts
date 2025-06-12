import { Usuario } from "@prisma/client";

export class UserEntity {
    id: string;
    tenantId: string;
    name: string;
    email: string;
    password: string;
    refreshToken?: string;
    role: 'ADMIN' | 'USER' | 'GUEST';
    createdAt: Date;
    updatedAt: Date;

    constructor(user: Usuario) {
        this.id = user.id;
        this.tenantId = user.tenantId;
        this.name = user.name;
        this.email = user.email;
        this.password = user.password;
        this.refreshToken = user.refreshToken || '';
        this.role = user.role as 'ADMIN' | 'USER' | 'GUEST';
        this.createdAt = user.createdAt;
        this.updatedAt = user.updatedAt;
    }
}