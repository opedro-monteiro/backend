import { PrismaService } from '@database/PrismaService';
import { Module } from '@nestjs/common';
import { BcryptEncrypter } from 'src/infrastructure/cryptography/bcrypt.encrypter';
import { TenantsController } from './tenants.controller';
import { TenantsService } from './tenants.service';
import { IEncrypter } from '@interfaces/cryptography/bcrypt/encrypter.interface';

@Module({
  controllers: [TenantsController],
  providers: [TenantsService, PrismaService,
    {
      provide: IEncrypter,
      useClass: BcryptEncrypter
    }
  ],
})
export class TenantsModule { }
