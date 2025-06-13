import { PrismaService } from '@database/PrismaService';
import { IEncrypter } from '@interfaces/cryptography/bcrypt/encrypter.interface';
import { ITenant } from '@interfaces/tenant/tenant.interface';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { TenantEntity } from './entities/tenant.entity';

@Injectable()
export class TenantsService implements ITenant {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly encrypter: IEncrypter,
  ) { }

  async create(createTenantDto: CreateTenantDto): Promise<TenantEntity> {
    return this.prismaService.$transaction(async (tx) => {
      const existingUser = await tx.usuario.findUnique({
        where: { email: createTenantDto.admin.email },
      });
      if (existingUser) {
        throw new ConflictException('Email já está em uso.');
      }

      const tenant = await tx.tenant.create({
        data: {
          name: createTenantDto.name
        }
      });

      const hashedPassword = await this.encrypter.hash(createTenantDto.admin.password);

      await tx.usuario.create({
        data: {
          tenantId: tenant.id,
          name: createTenantDto.admin.name,
          email: createTenantDto.admin.email,
          password: hashedPassword,
          role: 'ADMIN'
        }
      });

      return new TenantEntity(tenant);
    });
  }

  async findAll(): Promise<TenantEntity[]> {
    const tenants = await this.prismaService.tenant.findMany();
    return tenants.map(tenant => new TenantEntity(tenant));
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

  async update(id: string, updateTenantDto: UpdateTenantDto): Promise<TenantEntity> {
    const existingTenant = await this.prismaService.tenant.findUnique({ where: { id } })

    if (!existingTenant) throw new NotFoundException(`Tenant with id ${id} not found`);

    const tenant = await this.prismaService.tenant.update({
      where: { id },
      data: updateTenantDto
    });
    return new TenantEntity(tenant);
  }

  async remove(id: string): Promise<TenantEntity> {
    const existingTenant = await this.prismaService.tenant.findUnique({ where: { id } })

    if (!existingTenant) throw new NotFoundException(`Tenant with id ${id} not found`);

    const tenant = await this.prismaService.tenant.delete({
      where: { id }
    });
    return new TenantEntity(tenant);
  }
}
