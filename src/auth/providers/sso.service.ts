import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthResponse } from "../interfaces/auth.response";
import axios from "axios";

@Injectable()
export class SSOAuthService {
    constructor() { }

    async validate(username: string, password: string) {
        const { data } = await axios.post<AuthResponse>("https://api.cs.ui.ac.id/authentication/ldap/v2/", {
            username, password
        })
        if (data.state === 0) {
            throw new UnauthorizedException();
        }
        return data;
    }
}