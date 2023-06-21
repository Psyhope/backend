import { Body, Controller, Get, Post, Put, Req, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AccessTokenGuard } from "src/guards/accessToken.guard";
import { Request, Response } from "express";
import { RefreshTokenGuard } from "src/guards/refreshToken.guard";

@Controller("auth")
export class AuthController {
    constructor(private readonly auth: AuthService) { }

    @Post("login")
    async login(@Body() body: { username: string; password: string }, @Res() res: Response) {
        const { accessToken, refreshToken } = await this.auth.login(body.username, body.password);
        res
            .cookie("refreshToken", refreshToken, { httpOnly: true, sameSite: "none" })
            .cookie("accessToken", accessToken, { httpOnly: true, sameSite: "none" });
        return res.send({
            accessToken,
            refreshToken
        })
    }

    @UseGuards(AccessTokenGuard)
    @Get("logout")
    async logout(@Req() req: Request, @Res() res: Response) {
        res.clearCookie("refreshToken").clearCookie("accessToken");
        await this.auth.logout(req.user["sub"]);
        return res.send({ message: "Logout success" });
    }

    @UseGuards(RefreshTokenGuard)
    @Get("refresh")
    async refresh(@Req() req: Request, @Res() res: Response) {
        const { accessToken, refreshToken } = await this.auth.refresh(req.user["sub"], req.cookies.refreshToken);
        res
            .cookie("refreshToken", refreshToken, { httpOnly: true, sameSite: "none" })
            .cookie("accessToken", accessToken, { httpOnly: true, sameSite: "none" });
        return res.send({
            accessToken,
            refreshToken
        })
    }
}