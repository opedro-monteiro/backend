import { Cliente, Tenant, Usuario } from "@prisma/client"

export class TenantEntity {
    id: String
    name: String
    usuarios: Usuario[]
    clientes: Cliente[]

    constructor(tenant: Tenant) {
        this.id = tenant.id
        this.name = tenant.name
    }
}

