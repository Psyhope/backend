
import { Injectable } from '@nestjs/common';
import { CreateBookingInput } from './dto/create-booking.input';
import { UpdateBookingInput } from './dto/update-booking.input';
import { DbService } from 'src/providers/database/db';
import { Prisma } from '@prisma/client';
import { dayNames } from './const';
import { Councelor } from './entities/counselor.entity';
import { CounselorType } from './entities/booking.entity';
import { UserRepositories } from 'src/models/user.repo';
import { all } from 'axios';

@Injectable()
export class BookingService {
  constructor(private readonly db: DbService, private readonly userRepo: UserRepositories) { }

  async create(createBookingDto: Prisma.BookingCreateInput, faculty: string) {

    let randomizedCouncelor = null
    if(createBookingDto.counselorType == "FACULTY"){
      randomizedCouncelor = await this.db.councelor.findFirst({
        where: {
          councelorSchedule: {
            some: {
              workDay: dayNames[new Date(createBookingDto.bookingDate.toLocaleString()).getDay()],
              workTime: createBookingDto.bookingTime
            },
          },
          counselorType: createBookingDto.counselorType,
          user: {
            account: {
              faculty,
            }
          },
          Booking: {
            none: {
              bookingTime: createBookingDto.bookingTime,
              bookingDate: createBookingDto.bookingDate
            }
          },
        }
      })
    }
    else {
      randomizedCouncelor = await this.db.councelor.findFirst({
        where: {
          councelorSchedule: {
            some: {
              workDay: dayNames[new Date(createBookingDto.bookingDate.toLocaleString()).getDay()],
              workTime: createBookingDto.bookingTime
            },
          },
          counselorType: createBookingDto.counselorType,
          Booking: {
            none: {
              bookingTime: createBookingDto.bookingTime,
              bookingDate: createBookingDto.bookingDate
            }
          },
        }
      })
    }
    // kasih pengecualian ketika yg dirandom == null -> kirim email buat batal
    return await this.db.booking.create({
      data: {
        councelor: { 
          connect: {
            id: randomizedCouncelor.id
        }},
        ...createBookingDto,
      }
    });
  }

  async findAll(args: Prisma.BookingFindManyArgs) {
    return await this.db.booking.findMany(args);
  }

  async accept(id: number){
    return this.db.booking.update({
      where: {
        id,
      },
      data : {
        isAccepted : true,
      }
    })
  }

  async reject(id: number, userId: string, faculty: string){
    const updateBlacklist = await this.db.booking.update({
      where: {
        id,
      },
      data: {
        blacklist: {
          push: userId
        }
      }
    })

    let counselorIdAvailable = []
    let allCounselor = null

    if(updateBlacklist.counselorType == "PSYHOPE"){
      // kasih constraint ketika udah lebih dari 4x loop blm dapet juga jadinya cancel
      // get seluruh yg standby pada saat itu, remove ketika pas diloop keluar nama dia, repeat, kalo loopnya abis ya duar kasih email
      allCounselor = await this.db.councelor.findMany({
        where: {
          counselorType: updateBlacklist.counselorType,
          councelorSchedule : {
            some : {
              workDay: dayNames[updateBlacklist.bookingDate.getDay()],
              workTime: updateBlacklist.bookingTime
            }
          }
        }
      })
    }
    else {
      allCounselor = await this.db.councelor.findMany({
        where: {
          counselorType: updateBlacklist.counselorType,
          user: {
            account: {
              faculty,
            }
          },
          councelorSchedule : {
            some : {
              workDay: dayNames[updateBlacklist.bookingDate.getDay()],
              workTime: updateBlacklist.bookingTime
            }
          }
        }
      })
    }

    allCounselor.forEach((data) => {
      counselorIdAvailable.push(data.userId)
    })

  const blacklisted = updateBlacklist.blacklist
  const availableCounselor = counselorIdAvailable.filter((data) => {
    return !blacklisted.includes(data)
  })
  
  if(availableCounselor.length != 0){
    const selectedCounselor = availableCounselor[0]
    const objSelectedCounselor = await this.db.councelor.findFirst({
      where: {
        userId: selectedCounselor,
      }
    })

    return this.db.booking.update({
      where: {
        id,
      },
      data: {
        councelor: {
          connect: {
            id: objSelectedCounselor.id,
          }
        }
      }
    })
  }
    


  }

  findOne(id: number) {
    return `This action returns a #${id} booking`;
  }

  update(id: number, updateBookingInput: UpdateBookingInput) {
    return `This action updates a #${id} booking`;
  }

  remove(id: number) {
    return `This action removes a #${id} booking`;
  }

  async getSchedule(bookingDate: Date, counselorType: CounselorType, faculty: string, bookingTime: string){

    // kalo ada ya ada kalo engga ya berarti valuenya disable
    if (counselorType == "PSYHOPE"){
      return await this.db.councelorSchedule.findMany({
        where: {
          workDay: dayNames[new Date(bookingDate.toLocaleString()).getDay()],
          councelor : {
            counselorType,
            Booking : {
              none : {
                bookingTime,
                bookingDate,
              }
            }
          }
        }
      })
   }

  else if (counselorType == "FACULTY"){
    return await this.db.councelorSchedule.findMany({
      where: {
        workDay: dayNames[new Date(bookingDate.toLocaleString()).getDay()],
        councelor: {
          counselorType,
          Booking : {
            none : {
              bookingTime,
              bookingDate,
            }
          },
          user: {
            account: {
              faculty,
            }
          }
        }

      },
      })
    }
  }
}

