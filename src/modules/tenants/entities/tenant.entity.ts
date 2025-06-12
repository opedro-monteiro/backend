import { Cliente, Usuario } from "@prisma/client"

export class Tenant {
    id: String
    name: String
    usuarios: Usuario[]
    clientes: Cliente[]
}

