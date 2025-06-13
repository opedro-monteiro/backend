import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation
} from '@nestjs/swagger';
import { AuthPresenter } from 'src/presentation/auth.presenter';
import { AuthService } from './auth.service';
import { IsPublic } from './decorators/is-public.decorator';
import { LoginUserDto } from './dto/login-user.dto';
import { ResponseLoginDto } from './dto/response-login.dto';
import { GoogleAuthGuard } from './guards/google-oauth.guard';
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

  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  googleLogin() { }

  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  async googleCallback(@Req() req, @Res() res) {
    const response = await this.authService.login(req.user.id);
    res.redirect(`http://localhost:3333?token=${response.token}`);
  }

}
