import { Injectable } from '@nestjs/common';
import { CreateCounselingLogInput } from './dto/create-counseling-log.input';
import { DbService } from 'src/providers/database/db';
import { UserRepositories } from 'src/models/user.repo';
import { Prisma } from '@prisma/client';

@Injectable()
export class CounselingLogService {

  constructor(private readonly db: DbService, private readonly userRepo: UserRepositories) { }
  
  async create(createCounselingLogInput: CreateCounselingLogInput) {
    const temp = createCounselingLogInput.time
    temp.setHours(temp.getHours() + 7)
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

  async findAll(role: string, faculty: string){
    if (role == "PSYHOPE_ADMIN"){
      console.log(123123)
      return await this.db.counselingLog.findMany({
        where: {
          booking: {
            counselorType : "PSYHOPE"
          }
        },
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
      })
    } else {
      return await this.db.counselingLog.findMany({
        where: {
          booking: {
            counselorType : "FACULTY"
          },
          client: {
            account: {
              faculty
            }
          }
        },
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
      })
    }
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
