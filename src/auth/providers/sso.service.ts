import { Injectable, UnauthorizedException } from "@nestjs/common";
import axios from "axios";
import { AuthResponseSuccess } from "../interfaces/auth.response";

@Injectable()
export class SSOAuthService {
    constructor() { }

    async validate(username: string, password: string) {
        try {
            const res = await axios.post<{
                data: {
                    siakng_cc: string;
                    mojavi: string;
                }
            }>(`${process.env.AUTH_URL}/login`, {
                username, password
            })
            if (res.status === 401)
                throw new UnauthorizedException("Wrong username or password");
            const { mojavi, siakng_cc } = res.data.data;
            const userDataResponse = await axios.get<AuthResponseSuccess>(`${process.env.AUTH_URL}/me`, {
                headers: {
                    "X-Mojavi": mojavi,
                    "X-Siakng-Cc": siakng_cc
                }
            })
            if (userDataResponse.status === 200)
                return ({
                    username,
                    nama: userDataResponse.data.data.name,
                    state: 1,
                    kode_org: userDataResponse.data.data.group,
                    nama_role: userDataResponse.data.data.role
                })
        } catch (error) {
            console.log(error)
        }
    }
}