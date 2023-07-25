import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { DbService } from "src/providers/database/db";

@Injectable()
export class RescheduleRequestRepositories {
    constructor(private readonly db: DbService) { }

    create(createRequestRescheduleDto: Prisma.RescheduleRequestCreateInput) {
        return this.db.rescheduleRequest.create({
            data: createRequestRescheduleDto
        });
    }

    async findById(id: number) {
        return await this.db.rescheduleRequest.findUnique({
            where: { id }
        });
    }

    delete(id: number) {
        return this.db.rescheduleRequest.delete({
            where: { id }
        });
    }
}