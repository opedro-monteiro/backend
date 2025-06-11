import { PrismaService } from '@database/PrismaService';
import { Module } from '@nestjs/common';
import { LoginService } from './login.service';

@Module({
  providers: [LoginService, PrismaService],
  exports: [LoginService],
})
export class LoginModule {}
