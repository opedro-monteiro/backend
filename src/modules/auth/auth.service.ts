import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Usuario } from '@prisma/client';
import { compareSync } from 'bcrypt';
import { LoginService } from '../login/login.service';
import { UserPayload } from './models/UserPayload';
import { UserToken } from './models/UserToken';


@Injectable()
export class AuthService {
  constructor(
    private readonly loginService: LoginService,
    private readonly jwtService: JwtService,
  ) { }

  async login(usuarioArg: Usuario): Promise<UserToken> {
    const payload: UserPayload = {
      id: usuarioArg.id,
      role: usuarioArg.role,
    };

    const token: string = this.jwtService.sign(payload);
    const usuario = await this.loginService.findByEmail(usuarioArg.email);

    if (!usuario) {
      throw new Error('Usuário não encontrado.');
    }

    return { token, id: usuario.id, role: usuario.role };
  }

  async validateUser(email: string, password: string): Promise<Usuario> {
    const usuario = await this.loginService.findByEmail(email);

    if (usuario) {
      const isPasswordValid: boolean = compareSync(password, usuario.password);

      if (isPasswordValid) {
        return {
          ...usuario,
          password: "", // Não retornar a senha
        }
      }
    }

    throw new Error('Acesso não autorizado.');
  }
}
