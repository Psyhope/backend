import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

type JwtPayload = {
    sub: string;
    username: string;
};

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                AccessTokenStrategy.getJwtTokenFromRequest,
                ExtractJwt.fromAuthHeaderAsBearerToken(),
            ]),
            secretOrKey: process.env.JWT_ACCESS_SECRET,
        });
    }

    validate(payload: JwtPayload) {
        return payload;
    }

    private static getJwtTokenFromRequest(req: Request): string {
        if (req.cookies && 'accessToken' in req.cookies) {
            return req.cookies.accessToken;
        }
    }
}
