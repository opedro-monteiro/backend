import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import googleOauthConfig from 'src/configs/google-oauth.config';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
    constructor(
        @Inject(googleOauthConfig.KEY)
        private googleConfiguration: ConfigType<typeof googleOauthConfig>,
        private authService: AuthService,
    ) {
        super({
            clientID: googleConfiguration.clientID as string,
            clientSecret: googleConfiguration.clientSecret as string,
            callbackURL: googleConfiguration.callbackURL as string,
            scope: ['email', 'profile'],
            passReqToCallback: true,
        });
    }

    async validate(
        request: any,
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: VerifyCallback,
    ) {
        console.log({ profile });
        const user = await this.authService.validateGoogleUser({
            email: profile.emails[0].value,
            name: profile.displayName,
            role: 'USER', // or 'ADMIN' FAzer lógica de verificação de role (qual tipo de usuário é) como ta sendo cadastrado ou logado
            password: '',
        });
        // done(null, user);
        return user;
    }
}
