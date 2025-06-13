import { Cliente, Endereco } from "@prisma/client";
import { Type } from "class-transformer";
import { AddressEntity } from "./address.entity";

export class CostumerEntity {
    id: string;
    tenantId: string;
    publicId: string;
    name: string;
    email: string;
    isActive: boolean;
    contact: string;
    imageUrl: string | null;

    @Type(() => AddressEntity)
    address: AddressEntity | null;

    createdAt: Date;
    updatedAt: Date;

    constructor(costumer: Cliente & { address: Endereco | null }) {
        this.id = costumer.id;
        this.tenantId = costumer.tenantId;
        this.publicId = costumer.publicId;
        this.name = costumer.name;
        this.email = costumer.email;
        this.isActive = costumer.isActive;
        this.contact = costumer.contact;
        this.imageUrl = costumer.imageUrl;

        if (costumer.address) {
            this.address = new AddressEntity({
                id: costumer.address.id,
                street: costumer.address.street,
                neighborhood: costumer.address.neighborhood,
                number: costumer.address.number,
                state: costumer.address.state,
                clienteId: costumer.address.clienteId
            });
        }

        this.createdAt = costumer.createdAt;
        this.updatedAt = costumer.updatedAt;
    }
}
