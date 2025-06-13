import { PrismaService } from '@database/PrismaService';
import { ICostumer } from '@interfaces/customer/customer.interface';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PublicIdGenerator } from '../../utils';
import { CreateCostumerDto } from './dto/create-costumer.dto';
import { UpdateCostumerDto } from './dto/update-costumer.dto';
import { CostumerEntity } from './entities/costumer.entity';
@Injectable()
export class CostumersService implements ICostumer {
  constructor(private readonly prismaService: PrismaService,
    private publicIdGenerator: PublicIdGenerator,
  ) { }


  async create(createCostumerDto: CreateCostumerDto, tenantId: string): Promise<CostumerEntity> {
    const existingCostumer = await this.prismaService.cliente.findUnique({
      where: { email: createCostumerDto.email },
    });
    if (existingCostumer) {
      throw new ConflictException('Email already in use');
    }

    // Generate a publicId for the new costumer
    const publicId = await this.publicIdGenerator.generate('CL', tenantId);

    // Create the costumer (and address if provided) in a transaction
    const createdCostumer = await this.prismaService.$transaction(async (tx) => {
      return await tx.cliente.create({
        data: {
          name: createCostumerDto.name,
          email: createCostumerDto.email,
          isActive: createCostumerDto.isActive,
          contact: createCostumerDto.contact,
          imageUrl: createCostumerDto.imageUrl,
          publicId: publicId,
          tenantId: tenantId,
          address: {
            create: {
              street: createCostumerDto.address.street,
              neighborhood: createCostumerDto.address.neighborhood,
              number: createCostumerDto.address.number,
              state: createCostumerDto.address.state,
            }
          },
        },
        include: {
          address: true,
        },
      });
    });

    return new CostumerEntity(createdCostumer);
  }

  async findAll(tenantId: string): Promise<CostumerEntity[]> {
    const costumers = await this.prismaService.cliente.findMany({
      where: { tenantId },
      include: { address: true },
    });
    return costumers.map((costumer) => new CostumerEntity(costumer));
  }

  async findOne(id: string, tenantId: string): Promise<CostumerEntity> {
    const costumer = await this.prismaService.cliente.findUnique({
      where: { id, tenantId },
      include: { address: true },
    });
    if (!costumer) {
      throw new NotFoundException(`Costumer with id ${id} not found`);
    }
    return new CostumerEntity(costumer);
  }

  async update(id: string, tenantId: string, updateCostumerDto: UpdateCostumerDto): Promise<CostumerEntity> {
    const existingCostumer = await this.prismaService.cliente.findUnique({
      where: { id, tenantId },
      include: { address: true },
    });

    if (!existingCostumer) {
      throw new NotFoundException(`Costumer with id ${id} not found`);
    }

    let addressUpdate: any; // pode ser melhor tipado, mas `any` evita erro de tipo agora

    if (updateCostumerDto.address) {
      addressUpdate = existingCostumer.address
        ? { update: { ...updateCostumerDto.address } }
        : { create: { ...updateCostumerDto.address } };
    }

    const updateData: any = {
      ...updateCostumerDto,
    };

    // adiciona address *somente* se estiver definido
    if (addressUpdate) {
      updateData.address = addressUpdate;
    }

    const updatedCostumer = await this.prismaService.cliente.update({
      where: { id },
      data: updateData,
      include: { address: true },
    });

    return new CostumerEntity(updatedCostumer);
  }


  async remove(id: string, tenantId: string): Promise<CostumerEntity> {
    const existingCostumer = await this.prismaService.cliente.findUnique({
      where: { id, tenantId },
      include: { address: true },
    });
    if (!existingCostumer) {
      throw new NotFoundException(`Costumer with id ${id} not found`);
    }

    await this.prismaService.cliente.delete({
      where: { id },
    });

    return new CostumerEntity(existingCostumer);
  }
}
