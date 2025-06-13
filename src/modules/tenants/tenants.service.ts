import { PrismaService } from '@database/PrismaService';
import { ITenant } from '@interfaces/tenant/tenant.interface';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { TenantEntity } from './entities/tenant.entity';

@Injectable()
export class TenantsService implements ITenant {
  constructor(
    private readonly prismaService: PrismaService,
  ) { }

  async create(createTenantDto: CreateTenantDto, userId: string): Promise<TenantEntity> {
    return this.prismaService.$transaction(async (tx) => {
      // Create the tenant
      const tenant = await tx.tenant.create({
        data: {
          name: createTenantDto.name
        }
      });

      // update the user with the tenantId
      await tx.usuario.update({
        where: {id: userId},
        data: {
          tenantId: tenant.id 
        }
      });

      return new TenantEntity(tenant);
    });
  }

  async findAll(userId: string): Promise<TenantEntity[]> {
    const user = await this.prismaService.usuario.findUnique({ where: { id: userId } });
  
    if (user?.role !== 'ADMIN') {
      throw new ConflictException('Apenas administradores podem listar todos os tenants');
    }
  
    const tenants = await this.prismaService.tenant.findMany();
    return tenants.map((tenant) => new TenantEntity(tenant));
  }

  async findOne(id: string): Promise<TenantEntity> {
    const tenant = await this.prismaService.tenant.findUnique({
      where: { id }
    });
    if (!tenant) {
      throw new NotFoundException(`Tenant with id ${id} not found`);
    }
    return new TenantEntity(tenant);
  }

  async update(id: string, updateTenantDto: UpdateTenantDto, userId: string): Promise<TenantEntity> {
    const existingTenant = await this.prismaService.tenant.findUnique({ where: { id } })

    if (!existingTenant) throw new NotFoundException(`Tenant with id ${id} not found`);

    const tenant = await this.prismaService.tenant.update({
      where: { id },
      data: updateTenantDto
    });
    return new TenantEntity(tenant);
  }

  async remove(id: string, userId: string): Promise<TenantEntity> {
    const existingTenant = await this.prismaService.tenant.findUnique({ where: { id } })
    if (!existingTenant) throw new NotFoundException(`Tenant with id ${id} not found`);

    // Check if the tenant is associated with any users
    const user = await this.prismaService.usuario.findFirst({
      where: {
        id: userId,
      }
    })

    if(user?.role !== 'ADMIN' || user.tenantId !== id)  throw new ConflictException('Você não tem permissão para excluir este tenant.');
    const tenant = await this.prismaService.tenant.delete({
      where: { id }
    });
    return new TenantEntity(tenant)
  }
}
