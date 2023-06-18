import { HttpService } from "@nestjs/axios";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthResponse } from "../interfaces/auth.response";

@Injectable()
export class SSOAuthService {
    constructor(private readonly http: HttpService) { }

    async validate(username: string, password: string) {
        const { data } = await this.http.axiosRef.post<AuthResponse>("https://api.cs.ui.ac.id/authentication/ldap/v2/", {
            username, password
        })
        if (data.state === 0) {
            throw new UnauthorizedException();
        }
        return data;
    }
}