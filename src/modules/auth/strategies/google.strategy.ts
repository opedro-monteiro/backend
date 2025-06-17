import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';
import googleOauthConfig from '../config/google-oauth.config';
import { GoogleProfile } from '../types/google-user';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    @Inject(googleOauthConfig.KEY)
    private googleConfiguration: ConfigType<typeof googleOauthConfig>,
    private authService: AuthService,
  ) {

    if (!googleConfiguration.clinetID || !googleConfiguration.clientSecret || !googleConfiguration.callbackURL) {
      throw new Error("Google OAuth configuration is missing required fields: clientID, clientSecret, or callbackURL. Please check your configuration.");
    }
    super({
      clientID: googleConfiguration.clinetID,
      clientSecret: googleConfiguration.clientSecret,
      callbackURL: googleConfiguration.callbackURL,
      scope: ['email', 'profile'],
      passReqToCallback: false, // 🔥 Funciona agora
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: GoogleProfile,
    done: VerifyCallback,
  ) {
    const user = await this.authService.loginWithSocial(profile.emails[0].value);

    return {
      user: user.user,
      accessToken: user.accessToken,
      refreshToken: user.refreshToken,
    };
  }
}
