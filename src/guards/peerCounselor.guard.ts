import { ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";
import { LoggedIn } from "./loggedIn.guard";
import { Role } from "@prisma/client";
import { GqlExecutionContext } from "@nestjs/graphql";

export class PeerCounselor extends LoggedIn {
    canActivate(context: ExecutionContext): boolean {
        const ctx = GqlExecutionContext.create(context);
        return ctx.getContext().req.user.role === Role.FACULTY_COUNSELOR;
    }
}