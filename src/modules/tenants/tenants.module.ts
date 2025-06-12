import { PrismaService } from '@database/PrismaService';
import { Module } from '@nestjs/common';
import { TenantsController } from './tenants.controller';
import { TenantsService } from './tenants.service';
import { IEncrypter } from '@interfaces/cryptography/bcrypt/encrypter.interface';
import { BcryptEncrypter } from 'src/infrastructure/cryptography/bcrypt.encrypter';

@Module({
  controllers: [TenantsController],
  providers: [TenantsService, PrismaService, {
    provide: IEncrypter,
    useClass: BcryptEncrypter,
  }],
})
export class TenantsModule { }
