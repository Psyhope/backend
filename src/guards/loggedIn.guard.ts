import { ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";
import { AccessTokenGuard } from "./accessToken.guard";
import { GqlExecutionContext } from "@nestjs/graphql";

export class LoggedIn extends AccessTokenGuard {
    constructor() {
        super();
    }

    getRequest(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context);
        return ctx.getContext().req
    }
}