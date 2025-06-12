import { PrismaService } from '@database/PrismaService';
import { IEncrypter } from '@interfaces/cryptography/bcrypt/encrypter.interface';
import { Module } from '@nestjs/common';
import { BcryptEncrypter } from 'src/infrastructure/cryptography/bcrypt.encrypter';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService,
    {
      provide: IEncrypter,
      useClass: BcryptEncrypter,
    }
  ],
})
export class UsersModule { }
