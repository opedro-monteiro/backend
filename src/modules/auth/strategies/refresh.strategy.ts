import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy, StrategyOptionsWithRequest } from 'passport-jwt';
import refreshJwtConfig from 'src/configs/refresh-jwt.config';
import { AuthService } from '../auth.service';
import { AuthJwtPayload } from '../types/auth-jwtPayload';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(Strategy, 'refresh-jwt') {
  constructor(
    @Inject(refreshJwtConfig.KEY)
    private refreshJwtConfiguration: ConfigType<typeof refreshJwtConfig>,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: refreshJwtConfiguration.secret,
      ignoreExpiration: false,
      passReqToCallback: true,
    } as StrategyOptionsWithRequest);
  }

  async validate(req: Request, payload: AuthJwtPayload) {
    const refreshToken = req.get('authorization')?.replace('Bearer', '').trim();
    const userId = payload.sub;
    return this.authService.validateRefreshToken(userId, refreshToken ?? '');
  }
}
