import { IEncrypter } from '@interfaces/cryptography/bcrypt/encrypter.interface';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { PrismaService } from './../../database/PrismaService';
import refreshJwtConfig from './config/refresh-jwt.config';
import { LoginUserDto } from './dto/login-user.dto';
import { ResponseLoginDto } from './dto/response-login.dto';
import { UserPayload } from './dto/user-payload.dto';
import { AuthJwtPayload } from './types/auth-jwtPayload';
import { CurrentUser } from './types/current-user';
import { GoogleProfile } from './types/google-user';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private encrypter: IEncrypter,
    private userService: UsersService,
    @Inject(refreshJwtConfig.KEY)
    private refreshTokenConfig: ConfigType<typeof refreshJwtConfig>,
  ) { }
  // 🔑 Login com Email e Senha
  async loginWithEmail(credentials: LoginUserDto): Promise<ResponseLoginDto> {
    const user = await this.prismaService.usuario.findUnique({
      where: { email: credentials.email },
    });

    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado!');
    }

    const isPasswordValid = await this.encrypter.compare(
      credentials.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas!');
    }

    const payload: UserPayload = {
      id: user.id,
      email: user.email,
      role: user.role,
      tenantId: user.tenantId,
    };

    const token = this.jwtService.sign(payload);

    return {
      accessToken: token,
      refreshToken: user.refreshToken || '',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        tenantId: user.tenantId,
      }
    };
  }

  // 🌐 Login Social (Google)
  async loginWithSocial(email: string) {
    const user = await this.prismaService.usuario.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException(
        'Usuário não encontrado. Faça seu cadastro primeiro.',
      );
    }

    const payload: UserPayload = {
      id: user.id,
      email: user.email,
      role: user.role,
      tenantId: user.tenantId,
    };

    const token = this.jwtService.sign(payload);

    return {
      accessToken: token,
      refreshToken: user.refreshToken || '',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        tenantId: user.tenantId,
      }
    };
  }

  async generateTokens(userId: string) {
    const user = await this.prismaService.usuario.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado!');
    }

    const payload: UserPayload = {
      id: user.id,
      email: user.email,
      role: user.role,
      tenantId: user.tenantId,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, this.refreshTokenConfig),
    ]);

    return { accessToken, refreshToken };
  }

  async refreshToken(userId: string) {
    const { accessToken, refreshToken } = await this.generateTokens(userId);
    const hashedRefreshToken = await this.encrypter.hash(refreshToken);
    await this.userService.updateHashedRefreshToken(userId, hashedRefreshToken);
    return {
      id: userId,
      accessToken,
      refreshToken,
    };
  }

  async validateRefreshToken(userId: string, refreshToken: string) {
    const user = await this.userService.findOne(userId);
    if (!user || !user.refreshToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const isMatch = await this.encrypter.compare(
      refreshToken,
      user.refreshToken,
    );

    if (!isMatch) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    return { id: userId };
  }

  async signOut(userId: string) {
    await this.userService.updateHashedRefreshToken(userId, '');
  }

  async validateJwtUser(userId: string) {
    const user = await this.userService.findOne(userId);
    if (!user) throw new UnauthorizedException('User not found');

    return {
      id: user.id,
      role: user.role,
      email: user.email,
      tenantId: user.tenantId,
    };
  }
}
