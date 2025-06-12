import { IEncrypter } from '@interfaces/cryptography/bcrypt/encrypter.interface';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { BcryptEncrypter } from 'src/infrastructure/cryptography/bcrypt.encrypter';
import { LoginModule } from '../login/login.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategies';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    LoginModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy,
    {
      provide: IEncrypter,
      useClass: BcryptEncrypter
    }],
})
export class AuthModule { }
