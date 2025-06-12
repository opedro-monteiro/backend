import { PrismaService } from '@database/PrismaService';
import { IEncrypter } from '@interfaces/cryptography/bcrypt/encrypter.interface';
import { ConflictException, Injectable } from '@nestjs/common';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';

@Injectable()
export class TenantsService {
  constructor(private readonly prismaService: PrismaService,
    private readonly encrypter: IEncrypter,
  ) { }

  create(createTenantDto: CreateTenantDto) {
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

      return tenant;
    })
  }

  findAll() {
    return this.prismaService.tenant.findMany();
  }

  findOne(id: string) {
    return this.prismaService.tenant.findUnique({
      where: { id }
    });
  }

  update(id: string, updateTenantDto: UpdateTenantDto) {
    return this.prismaService.tenant.update({
      where: { id },
      data: updateTenantDto
    });
  }

  remove(id: string) {
    return this.prismaService.tenant.delete({
      where: { id }
    });
  }
}
