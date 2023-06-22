import { Role } from "@prisma/client";
import { LoggedIn } from "./loggedIn.guard";

export class PsyhopeCounselor extends LoggedIn {
    constructor() {
        super();
    }
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        return user.role === Role.PSYHOPE_COUNSELOR;
    }
}