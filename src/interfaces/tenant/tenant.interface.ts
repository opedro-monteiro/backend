import { CreateTenantDto } from "src/modules/tenants/dto/create-tenant.dto";
import { UpdateTenantDto } from "src/modules/tenants/dto/update-tenant.dto";
import { TenantEntity } from "src/modules/tenants/entities/tenant.entity";

export interface ITenant {
    create(createTenantEntityDto: CreateTenantDto, userId: string): Promise<TenantEntity>;
    findAll(userId: string): Promise<TenantEntity[]>;
    findOne(id: string): Promise<TenantEntity>;
    update(id: string, updateTenantEntityDto: UpdateTenantDto, userId: string): Promise<TenantEntity>;
    remove(id: string, userId: string): Promise<TenantEntity>;
}