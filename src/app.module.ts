import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CostumersModule } from './modules/costumers/costumers.module';
import { TenantsModule } from './modules/tenants/tenants.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), UsersModule, CostumersModule, TenantsModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
