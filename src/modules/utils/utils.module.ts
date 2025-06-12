import { PrismaService } from '@database/PrismaService';
import { Module } from '@nestjs/common';
import { PublicIdGenerator } from '@utils/index';

@Module({
    providers: [PublicIdGenerator, PrismaService],
    exports: [PublicIdGenerator],
})
export class UtilsModule { }
