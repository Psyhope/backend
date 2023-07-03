import { Role } from "@prisma/client";
import { LoggedIn } from "./loggedIn.guard";
import { CanActivate, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

export class PsyhopeCounselor implements CanActivate {
    canActivate(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context);
        return ctx.getContext().req.user.role === Role.PSYHOPE_COUNSELOR
    }
}