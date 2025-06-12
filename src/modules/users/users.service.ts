import { PrismaService } from '@database/PrismaService';
import { IEncrypter } from '@interfaces/cryptography/bcrypt/encrypter.interface';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {

  constructor(
    private readonly prismaService: PrismaService,
    private readonly encrypter: IEncrypter,
  ) { }

  async create(createUserDto: CreateUserDto, tenantId: string) {
    const hashedPassword = await this.encrypter.hash(createUserDto.password);

    return this.prismaService.usuario.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        password: hashedPassword,
        role: createUserDto.role || 'USER',
        tenantId: tenantId,
      },
    });
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
