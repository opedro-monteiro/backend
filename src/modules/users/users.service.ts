import { PrismaService } from '@database/PrismaService';
import { IEncrypter } from '@interfaces/cryptography/bcrypt/encrypter.interface';
import { IUser } from '@interfaces/user/user.interface';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService implements IUser {

  constructor(
    private readonly prismaService: PrismaService,
    private readonly encrypter: IEncrypter,
  ) { }

  async create(createUserDto: CreateUserDto, tenantId: string): Promise<UserEntity> {
    const existingUser = await this.prismaService.usuario.findUnique({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already in use');
    }
    const hashedPassword = await this.encrypter.hash(createUserDto.password);

    const createdUser = await this.prismaService.usuario.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        password: hashedPassword,
        role: createUserDto.role || 'USER',
        tenantId: tenantId,
      },
    });

    return new UserEntity(createdUser);
  }

  async findAll(): Promise<UserEntity[]> {
    const users = await this.prismaService.usuario.findMany();
    return users.map(user => new UserEntity(user));
  }

  async findOne(id: string): Promise<UserEntity> {
    const user = await this.prismaService.usuario.findUnique({
      where: { id: id.toString() }
    });

    if (!user) {
      throw new Error('User not found');
    }

    return new UserEntity(user);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    console.log("Email to find:", email);
    const user = await this.prismaService.usuario.findUnique({
      where: { email },
    })

    return user ? new UserEntity(user) : null;
  }

  async updateHashedRefreshToken(userId: string, hashedRefreshToken: string): Promise<UserEntity> {
    const user = await this.prismaService.usuario.update({
      where: { id: userId },
      data: {
        refreshToken: hashedRefreshToken
      }
    })

    return new UserEntity(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.prismaService.usuario.update({
      where: { id: id.toString() },
      data: updateUserDto
    });

    return new UserEntity(user);
  }

  async remove(id: string): Promise<UserEntity> {
    const existingUser = await this.prismaService.usuario.findUnique({
      where: { id },
    });
    if (!existingUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    const user = await this.prismaService.usuario.delete({
      where: { id: id.toString() }
    });

    return new UserEntity(user);
  }

}
