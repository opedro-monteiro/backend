import { IEncrypter } from '@interfaces/cryptography/bcrypt/encrypter.interface';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { PrismaService } from './../../database/PrismaService';
import refreshJwtConfig from './config/refresh-jwt.config';
import { AuthJwtPayload } from './types/auth-jwtPayload';
import { CurrentUser } from './types/current-user';
import { GoogleProfile } from './types/google-user';

@Injectable()
export class AuthService {
  constructor(
    private PrismaService: PrismaService,
    private jwtService: JwtService,
    private encrypter: IEncrypter,
    private userService: UsersService,
    @Inject(refreshJwtConfig.KEY)
    private refreshTokenConfig: ConfigType<typeof refreshJwtConfig>,
  ) { }

  async validateUser(email: string, password: string) {
    const user = await this.PrismaService.usuario.findUnique({
      where: { email }
    })
    if (!user) throw new UnauthorizedException('Usuário não encontrado!');

    const isPasswordMatch = await this.encrypter.compare(password, user.password);
    if (!isPasswordMatch)
      throw new UnauthorizedException('Credenciais inválidas!');

    return { id: user.id };
  }

  async login(userId: string) {
    // const payload: AuthJwtPayload = { sub: userId };
    // const token = this.jwtService.sign(payload);
    // const refreshToken = this.jwtService.sign(payload, this.refreshTokenConfig);
    const { accessToken, refreshToken } = await this.generateTokens(userId);
    const hashedRefreshToken = await this.encrypter.hash(refreshToken);

    await this.userService.updateHashedRefreshToken(userId, hashedRefreshToken);
    return {
      id: userId,
      accessToken,
      refreshToken,
    };
  }

  async generateTokens(userId: string) {
    const payload: AuthJwtPayload = { sub: userId, tenantId: "", role: "ADMIN" };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, this.refreshTokenConfig),
    ]);
    return {
      accessToken,
      refreshToken,
    };
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
    if (!user || !user.refreshToken)
      throw new UnauthorizedException('Invalid Refresh Token');

    const refreshTokenMatches = await this.encrypter.compare(
      user.refreshToken,
      refreshToken,
    );
    if (!refreshTokenMatches)
      throw new UnauthorizedException('Invalid Refresh Token');

    return { id: userId };
  }

  async signOut(userId: string) {
    await this.userService.updateHashedRefreshToken(userId, "");
  }

  async validateJwtUser(userId: string) {
    const user = await this.userService.findOne(userId);
    if (!user) throw new UnauthorizedException('User not found!');
    const currentUser: CurrentUser = { id: user.id, role: user.role };
    return currentUser;
  }

  async validateGoogleUser(googleUser: GoogleProfile) {
    console.log("@validateGoogleUser called with:", googleUser);
    console.log("@validateGoogleUser - Email:", googleUser.emails[0].value);

    const user = await this.userService.findByEmail(googleUser.emails[0].value);
    if (user) return user;

    return await this.PrismaService.usuario.create({
      data: {
        name: googleUser.displayName,
        email: googleUser.emails[0].value,
        role: 'ADMIN',
        password: "",
        tenantId: googleUser.id,
      }
    });
  }
}
