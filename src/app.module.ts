import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { CostumersModule } from './modules/costumers/costumers.module';
import { TenantsModule } from './modules/tenants/tenants.module';
import { UsersModule } from './modules/users/users.module';
import { UtilsModule } from './modules/utils/utils.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), UsersModule, CostumersModule, TenantsModule, AuthModule, UtilsModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
