import { CreateCostumerDto } from "src/modules/costumers/dto/create-costumer.dto";
import { UpdateCostumerDto } from "src/modules/costumers/dto/update-costumer.dto";
import { CostumerEntity } from "src/modules/costumers/entities/costumer.entity";

export interface ICostumer {
    create(createCostumerEntityDto: CreateCostumerDto, tenantId: string): Promise<CostumerEntity>;
    findAll(tenantId: string): Promise<CostumerEntity[]>;
    findOne(id: string, tenantId: string): Promise<CostumerEntity>;
    update(id: string, tenantId: string, updateCostumerEntityDto: UpdateCostumerDto): Promise<CostumerEntity>;
    remove(id: string, tenantId: string): Promise<CostumerEntity>;
}