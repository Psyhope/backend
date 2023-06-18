import { Injectable } from "@nestjs/common";
import { FACULTY_MAP } from "src/auth/constants/faculty.constant";
import { MAJOR_MAP } from "src/auth/constants/major.contant";
import { SSOAuthService } from "src/auth/providers/sso.service";
import { DbService } from "src/providers/database/db";

@Injectable()
export class UserRepositories {
    constructor(
        private readonly db: DbService,
        private readonly sso: SSOAuthService
    ) { }

    async create(username: string, password: string) {
        const user = await this.sso.validate(username, password);
        const { kode_org } = user;
        const split = kode_org.split('.');
        const faculty: typeof FACULTY_MAP[keyof typeof FACULTY_MAP] = FACULTY_MAP[`#.#.${split[2]}.${split[3]}`];
        // const major =
        // this.db.user.create({
        //     data: {

        //     }
        // })
    }
}