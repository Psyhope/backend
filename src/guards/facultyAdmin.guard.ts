import { Role } from "@prisma/client";
import { LoggedIn } from "./loggedIn.guard";
import { GqlExecutionContext } from "@nestjs/graphql";

export class FacultyAdmin extends LoggedIn {
    canActivate(context) {
        const ctx = GqlExecutionContext.create(context);
        return ctx.getContext().req.user.role === Role.FACULTY_ADMIN
    }
}