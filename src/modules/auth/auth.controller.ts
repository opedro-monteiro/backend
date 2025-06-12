import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation
} from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { AuthPresenter } from 'src/presentation/auth.presenter';
import { AuthService } from './auth.service';
import { IsPublic } from './decorators/is-public.decorator';
import { LoginUserDto } from './dto/login-user.dto';
import { ResponseLoginDto } from './dto/response-login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @IsPublic()
  @Post('login')
  @ApiOperation({ summary: 'Rota para login de usuários.' })
  @ApiBody({ type: LoginUserDto })
  @ApiOkResponse({ type: ResponseLoginDto })
  @HttpCode(HttpStatus.OK)
  @ApiBadRequestResponse({ description: 'Requisição inválida.' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.' })
  @UseGuards(JwtAuthGuard)
  async login(@Body() credentials: LoginUserDto) {
    const tokenData = await this.authService.login(credentials);
    return AuthPresenter.toResponse(tokenData);
  }
}
