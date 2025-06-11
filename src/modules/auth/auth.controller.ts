import { Controller, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { IsPublic } from './decorators/is-public.decorator';
import { LoginUserDto } from './dto/login-user.dto';
import { ResponseLoginDto } from './dto/response-login.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './models/AuthRequest';

@ApiTags('Autenticação')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @Post('login')
  @ApiOperation({ summary: 'Rota para login de usuários.' })
  @ApiBody({ type: LoginUserDto })
  @ApiOkResponse({ type: ResponseLoginDto })
  @HttpCode(HttpStatus.OK)
  @ApiBadRequestResponse({ description: 'Requisição inválida.' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.' })
  @UseGuards(LocalAuthGuard)
  async login(@Request() req: AuthRequest) {
    const { user } = req;
    return this.authService.login(user);
  }
}
