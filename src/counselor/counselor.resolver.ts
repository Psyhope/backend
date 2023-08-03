import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CounselorService } from './counselor.service';
import { Councelor } from 'src/booking/entities/counselor.entity';
import { GetCouncelorFilter } from './dto/getCounselor.input'
import { UseGuards } from '@nestjs/common';
import { LoggedIn } from 'src/guards/loggedIn.guard';
import { CurrentUser } from 'src/auth/decorator/currentUser.decorator';
import { JwtPayload } from 'src/auth/interfaces/jwt.payload';
import { UserRepositories } from 'src/models/user.repo';
import { create } from 'domain';
import { get } from 'http';
@Resolver(() => Councelor)
export class CounselorResolver {
  constructor(private readonly counselorService: CounselorService,private readonly userRepo: UserRepositories) {}


  @Query(() => [Councelor], { name: 'counselorFilter', nullable: true })
  @UseGuards(LoggedIn)
  async getCounselorFilter(@Args('getCounselorDto') getCounselorDto: GetCouncelorFilter, @CurrentUser() user:JwtPayload) {
    const _user = await this.userRepo.findById(user.sub)
    if(getCounselorDto.bookingDay==null && getCounselorDto.counselorName == null){
      if(user.role.split('_')[0] == "FACULTY"){
        return this.counselorService.findAll({
          where: {
            counselorType : "FACULTY",
            user : {
              account : {
                faculty :  _user.account.faculty
              }
            },
            Booking: {
              some: {
                isTerminated: false,
                isAccepted: true
              },
            }
          }
        })
      } else {
        return this.counselorService.findAll({
          where: {
            counselorType : "PSYHOPE",
            Booking: {
              some: {
                isTerminated: false,
                isAccepted: true
              }
            }
          }
        })
      }
    }
    else if (getCounselorDto.bookingDay != null && getCounselorDto.counselorName == null) {
      if(user.role.split('_')[0] == 'FACULTY'){
        return this.counselorService.findAll({
          where: {
            counselorType : "FACULTY",
            user : {
              account : {
                faculty :  _user.account.faculty
              }
            },
            Booking: {
              some: {
                bookingDay: getCounselorDto.bookingDay,
                isTerminated: false,
                isAccepted: true
              }
            }
          }
        })
      } else {
        return this.counselorService.findAll({
          where: {
            counselorType : "PSYHOPE",
            Booking: {
              some: {
                bookingDay: getCounselorDto.bookingDay,
                isTerminated: false,
                isAccepted: true
              }
            }
          }
        })
      }
    }
    else if (getCounselorDto.counselorName != null && getCounselorDto.bookingDay == null) {
      if(user.role.split('_')[0] == "FACULTY"){
        return this.counselorService.findAll({
          where: {
            counselorType : "FACULTY",
            user : {
              username: getCounselorDto.bookingDay,
              account : {
                faculty :  _user.account.faculty,
              }
            },
            Booking: {
              some: {
                isTerminated: false,
                isAccepted: true
              }
            }
          }
        })
      } else {
        return this.counselorService.findAll({
          where: {
            counselorType : "PSYHOPE",
            user: {
              fullname : getCounselorDto.counselorName,
            },
            Booking: {
              some: {
                isTerminated: false,
                isAccepted: true
              }
            }
          }
        })
      }
    }
    else {
      if(user.role.split('_')[0] == "FACULTY"){
        return this.counselorService.findAll({
          where: {
            counselorType : "FACULTY",
            user : {
              username: getCounselorDto.counselorName,
              account : {
                faculty :  _user.account.faculty
              }
            },
            Booking: {
              some: {
                bookingDay: getCounselorDto.bookingDay,
                isTerminated: false,
                isAccepted: true
              }
            }
          }
        })
      } else {
        return this.counselorService.findAll({
          where: {
            counselorType : "PSYHOPE",
            user : {
              username: getCounselorDto.counselorName
            },
            Booking: {
              some: {
                bookingDay: getCounselorDto.bookingDay,
                isTerminated: false,
                isAccepted: true
              }
            }
          }
        })
      }
    }
  }
}
