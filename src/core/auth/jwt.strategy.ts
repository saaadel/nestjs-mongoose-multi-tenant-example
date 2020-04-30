import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { CONFIG_TOKEN } from '../config/config-token.provider';
import { AuthService, IUser } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    @Inject(CONFIG_TOKEN) private readonly env: { secretKey: string },
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: env.secretKey,
    });
  }

  async validate(payload: any): Promise<IUser> {
    // tslint:disable-next-line: no-console
    // console.info('JwtStrategy.validate payload:', payload);

    const user: IUser | undefined = await this.authService.authorize(
      payload.sub,
    );
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
