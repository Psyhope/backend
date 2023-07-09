import { Injectable } from '@nestjs/common';
import { CounselorType } from '@prisma/client';
import { DbService } from 'src/providers/database/db';

@Injectable()
export class BookingRepositories {
    constructor(private  db: DbService ){}

    async create(
        time: Date,
        userId : string,
        counselorType: CounselorType,
        reasonApply: string,
        closestKnown: boolean,
        number_1: number,
        number_2: number,
        number_3: number,
        number_4: number,
        number_5: number,
        number_6: number,
        number_7: number,
        number_8: number,
        number_9: number,
        number_10: number,
        number_11: number,
        number_12: number,
    ){
        return await this.db.booking.create({
            data: {
                time,
                userId,
                counselorType,
                reasonApply,
                closestKnown,
                number_1,
                number_2,
                number_3,
                number_4,
                number_5,
                number_6,
                number_7,
                number_8,
                number_9,
                number_10,
                number_11,
            }
        });
    }

    async delete(id: number){
        return await this.db.booking.delete({
            where: {
                id,
            }
        })
    }
}