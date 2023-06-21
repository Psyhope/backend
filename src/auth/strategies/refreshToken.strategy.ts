import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
    Strategy,
    'jwt-refresh',
) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                RefreshTokenStrategy.getJwtTokenFromRequest,
                ExtractJwt.fromAuthHeaderAsBearerToken(),
            ]),
            secretOrKey: process.env.JWT_REFRESH_SECRET,
            passReqToCallback: true,
        });
    }

    validate(req: Request, payload: any) {
        const refreshToken = req.cookies.refreshToken;
        return { ...payload, refreshToken };
    }

    private static getJwtTokenFromRequest(req: Request): string {
        if (req.cookies && 'refreshToken' in req.cookies) {
            return req.cookies.refreshToken;
        }
    }
}
