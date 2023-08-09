import { Role } from "@prisma/client";

export interface JwtPayload {
    exp: number;
    iat: number;
    role: Role;
    secondRole: Role;
    sub: string;
    username: string;
    isOnboarded: boolean;
    faculty: string;
}