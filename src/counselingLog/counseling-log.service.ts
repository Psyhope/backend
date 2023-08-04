import { Injectable } from '@nestjs/common';
import { CreateCounselingLogInput } from './dto/create-counseling-log.input';
import { DbService } from 'src/providers/database/db';
import { UserRepositories } from 'src/models/user.repo';
import { Prisma } from '@prisma/client';

@Injectable()
export class CounselingLogService {

  constructor(private readonly db: DbService, private readonly userRepo: UserRepositories) { }
  
  async create(createCounselingLogInput: CreateCounselingLogInput) {
    const booking = await this.db.booking.findUnique({
      where: {
        id : createCounselingLogInput.bookingId,
      }
    })

    return await this.db.counselingLog.create({
      data: {
        detail: createCounselingLogInput.detail,
        time: createCounselingLogInput.time,
        title: createCounselingLogInput.title,
        booking: {
          connect : {
            id: createCounselingLogInput.bookingId,
          }
        },
        client: {
          connect:{
            id: booking.userId
          }
        }
      }
    })
  }

  async findAll(args: Prisma.CounselingLogFindManyArgs){
    return await this.db.counselingLog.findMany({
      include: {
       client: {
        include: {
          account: true
       }},
       booking: {
        include: {
          councelor: {
            include: {
              user: {
                include: {
                  account: true
                }
              }
            }
          }
        }
       }
      },
      ...args
    })
  }

  async findByBookingId(bookingId : number){
    return await this.db.counselingLog.findMany({
      include: {
        client: {
         include: {
           account: true
        }},
        booking: {
         include: {
           councelor: {
             include: {
               user: {
                 include: {
                   account: true
                 }
               }
             }
           }
         }
        }
       },
      where: {
        booking: {
          id: bookingId,
        }
      }
    })
  }

}
