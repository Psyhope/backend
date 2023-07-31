import { ForbiddenException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { hash, verify } from "argon2";
import { UserRepositories } from "src/models/user.repo";

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepo: UserRepositories,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) { }

    async login(username: string, password: string) {
        const user = await this.userRepo.create(username, password)
        console.log(user)
        const tokens = await this.getTokens(user.id);
        await this.updateRefreshToken(user.id, tokens.refreshToken);
        return tokens;
    }

    async logout(id: string) {
        await this.updateRefreshToken(id, '');
    }

    async updateRefreshToken(userId: string, refreshToken: string) {
        const hashedRefreshToken = await hash(refreshToken);
        await this.userRepo.update(userId, {
            token: hashedRefreshToken,
        });
    }


    async getTokens(userId: string) {
        const { username, account, isOnboarded } = await this.userRepo.findById(userId);
        const { role } = account;
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(
                { sub: userId, username, role, isOnboarded },
                { secret: this.configService.get<string>('JWT_ACCESS_SECRET'), expiresIn: '15m' },
            ),
            this.jwtService.signAsync(
                { sub: userId, username, role, isOnboarded },
                { secret: this.configService.get<string>('JWT_REFRESH_SECRET'), expiresIn: '3d' },
            ),
        ]);

        return {
            accessToken,
            refreshToken,
        };
    }

    async refresh(id: string, refreshToken: string) {
        const user = await this.userRepo.findById(id);
        if (!user || !user.token)
            throw new ForbiddenException("Access denied");

        if (!(await verify(user.token, refreshToken)))
            throw new ForbiddenException("Access denied");

        const tokens = await this.getTokens(user.id);
        await this.updateRefreshToken(user.id, tokens.refreshToken);
        return tokens;
    }

    async updateLineorIgAcc(userId: string, igAcc: string, lineAcc: string) {
        await this.userRepo.update(userId, {
            igAcc,
            lineAcc,
        })
    }

}