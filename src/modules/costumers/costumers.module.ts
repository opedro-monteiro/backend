import { PrismaService } from '@database/PrismaService';
import { Module } from '@nestjs/common';
import { UtilsModule } from '../utils/utils.module';
import { CostumersController } from './costumers.controller';
import { CostumersService } from './costumers.service';

@Module({
  imports: [UtilsModule],
  controllers: [CostumersController],
  providers: [CostumersService, PrismaService],
})
export class CostumersModule { }
