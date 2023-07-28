import { Injectable } from '@nestjs/common';
import { GetCouncelorFilter } from './dto/getCounselor.input';
import { DbService } from 'src/providers/database/db';
import { UserRepositories } from 'src/models/user.repo';
import { Prisma } from '@prisma/client';

@Injectable()
export class CounselorService {
  constructor(private readonly db: DbService, private readonly userRepo: UserRepositories) { }

  async findAll(args: Prisma.CouncelorFindManyArgs) {
    return await this.db.councelor.findMany({
      include: {
        user: {
          include: {
            account: true
          }
        },
        Booking: {
          include :{
            user: {
              include :{
                account : true
              }
            }
          }
        }
      },
      ... args
    })
    ;
  }

  
}
