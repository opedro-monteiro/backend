import { plainToInstance } from 'class-transformer';
import { TenantResponseDto } from 'src/modules/tenants/dto/TenantResponseDto';
import { TenantEntity } from 'src/modules/tenants/entities/tenant.entity';

export class TenantPresenter {
    static toResponse(tenant: TenantEntity): TenantResponseDto {
        return plainToInstance(TenantResponseDto, tenant, {
            excludeExtraneousValues: true,
        });
    }

    static toManyResponse(tenants: TenantEntity[]): TenantResponseDto[] {
        return plainToInstance(TenantResponseDto, tenants, {
            excludeExtraneousValues: true,
        });
    }
}
