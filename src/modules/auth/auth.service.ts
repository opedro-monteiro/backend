import { IEncrypter } from '@interfaces/cryptography/bcrypt/encrypter.interface';
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Usuario } from '@prisma/client';
import { compareSync } from 'bcrypt';
import { LoginService } from '../login/login.service';
import { LoginUserDto } from './dto/login-user.dto';
import { UserPayload } from './models/UserPayload';
import { UserToken } from './models/UserToken';


@Injectable()
export class AuthService {
  constructor(
    private readonly loginService: LoginService,
    private readonly jwtService: JwtService,
    private readonly encrypter: IEncrypter,
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
      password: "", // Não retornar a senha
    }
  }

}
