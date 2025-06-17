import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards
} from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { AuthPresenter } from 'src/presentation/auth.presenter';
import { AuthService } from './auth.service';
import { IsPublic } from './decorators/public.decorator';
import { LoginUserDto } from './dto/login-user.dto';
import { ResponseLoginDto } from './dto/response-login.dto';
import { GoogleAuthGuard } from './guards/google-auth/google-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';
import { RefreshAuthGuard } from './guards/refresh-auth/refresh-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @IsPublic()
  @Post('login')
  @ApiOperation({ summary: 'Rota para login com email e senha.' })
  @ApiBody({ type: LoginUserDto })
  @ApiOkResponse({ type: ResponseLoginDto })
  @ApiBadRequestResponse({ description: 'Requisição inválida.' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.' })
  @HttpCode(HttpStatus.OK)
  async login(@Body() credentials: LoginUserDto) {
    const tokenData = await this.authService.loginWithEmail(credentials);
    return AuthPresenter.toResponse(tokenData);
  }

  @Post('logout')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  signOut(@Req() req) {
    this.authService.signOut(req.user.id);
  }

  @Post('refresh')
  @UseGuards(RefreshAuthGuard)
  refreshToken(@Req() req) {
    return this.authService.refreshToken(req.user.id);
  }

  @Get('profile')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  getProfile(@Req() req) {
    console.log('User Profile:', req);
    return req.user;
  }

  @IsPublic()
  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  googleLogin() {
    return { message: 'Redirecting to Google...' };
  }

  @IsPublic()
  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  async googleCallback(@Req() req, @Res() res) {
    const { id, name, email, role, tenantId } = req.user.user;
    const { accessToken, refreshToken } = req.user;

    if (!accessToken || !id || !name || !email || !role || !tenantId)
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Missing user data in callback response.');

    const redirectUrl = new URL(process.env.REDIRECT_URL || '');

    redirectUrl.searchParams.set('token', accessToken);
    redirectUrl.searchParams.set('refreshToken', refreshToken);
    redirectUrl.searchParams.set('id', id);
    redirectUrl.searchParams.set('name', name);
    redirectUrl.searchParams.set('email', email);
    redirectUrl.searchParams.set('role', role);
    redirectUrl.searchParams.set('tenantId', tenantId);

    return res.redirect(redirectUrl.toString());
  }
}
