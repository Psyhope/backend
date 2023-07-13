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

    async findMany(args: Prisma.BookingFindManyArgs) {
        return await this.db.booking.findMany(args);
    }

    async findById(id: number) {
        return await this.db.booking.findUnique({
            where: { id }
        });
    }

    update(id: number, updateBookingInput: Prisma.BookingUpdateArgs["data"]) {
        return this.db.booking.update({
            where: { id },
            data: updateBookingInput
        });
    }

    async delete(id: number) {
        return await this.db.booking.delete({ where: { id } });
    }
}