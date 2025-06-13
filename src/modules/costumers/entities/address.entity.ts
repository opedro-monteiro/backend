import { Endereco } from "@prisma/client";

export class AddressEntity {
    id: string;
    street: string;
    neighborhood: string;
    number: string;
    state: string;
    clienteId: string;

    constructor(address?: Endereco) {
        if (!address) {
            return; // pode ser null
        }

        this.id = address.id;
        this.street = address.street;
        this.neighborhood = address.neighborhood;
        this.number = address.number;
        this.state = address.state;
        this.clienteId = address.clienteId;
    }
}