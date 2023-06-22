import { Role } from "@prisma/client";
import { LoggedIn } from "./loggedIn.guard";

export class FacultyAdmin extends LoggedIn {
    constructor() {
        super();
    }
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        return user.role === Role.FACULTY_ADMIN;
    }
}