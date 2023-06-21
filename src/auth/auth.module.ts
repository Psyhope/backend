import { Module } from "@nestjs/common";
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';
import { UserRepositories } from "src/models/user.repo";
import { DbService } from "src/providers/database/db";
import { SSOAuthService } from "./providers/sso.service";
import { ConfigService } from "@nestjs/config";

@Module({
    imports: [JwtModule.register({})],
    providers: [
        AccessTokenStrategy,
        SSOAuthService,
        RefreshTokenStrategy,
        UserRepositories, AuthService,
        DbService,
        ConfigService
    ],
    controllers: [AuthController],
    exports: [AuthService]
})
export class AuthModule { }