import { ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";
import { LoggedIn } from "./loggedIn.guard";
import { Role } from "@prisma/client";

export class PeerCounselor extends LoggedIn {
    constructor() {
        super();
    }

    override canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        return user.role === Role.PSYHOPE_COUNSELOR;
    }
}