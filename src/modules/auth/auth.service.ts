import { IEncrypter } from '@interfaces/cryptography/bcrypt/encrypter.interface';
import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Usuario } from '@prisma/client';
import refreshJwtConfig from 'src/configs/refresh-jwt.config';
import { LoginService } from '../login/login.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { PrismaService } from './../../database/PrismaService';
import { LoginUserDto } from './dto/login-user.dto';
import { UserPayload } from './models/UserPayload';
import { UserToken } from './models/UserToken';
import { AuthJwtPayload } from './types/auth-jwtPayload';


@Injectable()
export class AuthService {
  constructor(
    private readonly loginService: LoginService,
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly encrypter: IEncrypter,

    @Inject(refreshJwtConfig.KEY)
    private refreshTokenConfig: ConfigType<typeof refreshJwtConfig>
  ) { }

  async login(usuarioArg: LoginUserDto): Promise<UserToken> {
    const user = await this.validateUser(usuarioArg.email, usuarioArg.password);

    const payload: UserPayload = {
      id: user.id,
      role: user.role,
      email: user.email,
      tenantId: user.tenantId,
    };

    const token: string = this.jwtService.sign(payload);

    return { token, id: user.id, role: user.role };
  }

  async validateUser(email: string, password: string): Promise<Usuario> {
    const usuario = await this.loginService.findByEmail(email);
    if (!usuario) throw new NotFoundException('Usuário não encontrado.');

    const isPasswordValid: boolean = await this.encrypter.compare(password, usuario.password);
    if (!isPasswordValid) throw new UnauthorizedException("Senha inválida.");

    return {
      ...usuario,
      password: "",
    }
  }

  async generateTokens(userId: string) {
    const payload: AuthJwtPayload = { sub: userId };
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
    await this.loginService.updateHashedRefreshToken(userId, hashedRefreshToken);
    return {
      id: userId,
      accessToken,
      refreshToken,
    };
  }

  googleLogin(req: any) {
    throw new Error('Method not implemented.');
  }

  async validateGoogleUser(googleUser: CreateUserDto) {
    const user = await this.prismaService.usuario.findUnique({
      where: { email: googleUser.email },
    });
    if (user) return user;

    return await this.prismaService.usuario.create({
      data: {
        name: googleUser.name,
        email: googleUser.email,
        password: '',
        role: 'USER',
        tenantId: '',
      },
    })
  }

  async validateRefreshToken(userId: number, refreshToken: string) {
    const user = await this.userService.findOne(userId);
    if (!user || !user.hashedRefreshToken)
      throw new UnauthorizedException('Invalid Refresh Token');

    const refreshTokenMatches = await argon2.verify(
      user.hashedRefreshToken,
      refreshToken,
    );
    if (!refreshTokenMatches)
      throw new UnauthorizedException('Invalid Refresh Token');

    return { id: userId };
  }

}
