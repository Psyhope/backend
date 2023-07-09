import { Injectable } from '@nestjs/common';
import { CounselorType, Prisma } from '@prisma/client';
import { DbService } from 'src/providers/database/db';

@Injectable()
export class BookingRepositories {
    constructor(private db: DbService) { }

    async create(createBookingDto: Prisma.BookingCreateArgs["data"]) {
        return await this.db.booking.create({
            data: createBookingDto
        });
    }

    async delete(id: number) {
        return await this.db.booking.delete({ where: { id } });
    }
}