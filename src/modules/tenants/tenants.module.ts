import { PrismaService } from '@database/PrismaService';
import { Module } from '@nestjs/common';
import { TenantsController } from './tenants.controller';
import { TenantsService } from './tenants.service';

@Module({
  controllers: [TenantsController],
  providers: [TenantsService, PrismaService],
})
export class TenantsModule { }
