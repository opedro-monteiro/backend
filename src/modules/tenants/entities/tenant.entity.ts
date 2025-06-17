import { Tenant } from "@prisma/client"

export class TenantEntity {
    id: String
    name: String

    constructor(tenant: Tenant) {
        this.id = tenant.id
        this.name = tenant.name
    }
}

