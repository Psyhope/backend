
import { Injectable } from '@nestjs/common';
import { CreateBookingInput } from './dto/create-booking.input';
import { UpdateBookingInput } from './dto/update-booking.input';
import { DbService } from 'src/providers/database/db';
import { Prisma } from '@prisma/client';
import { dayNames } from './const';
import { Councelor } from './entities/counselor.entity';
import { CounselorType } from './entities/booking.entity';

@Injectable()
export class BookingService {
  constructor(private readonly db: DbService) { }

  async create(createBookingDto: Prisma.BookingCreateInput, faculty: string) {

    let randomizedCouncelor = null
    if(createBookingDto.counselorType == "FACULTY"){
      randomizedCouncelor = await this.db.councelor.findFirst({
        where: {
          councelorSchedule: {
            some: {
              workDay: dayNames[new Date(createBookingDto.bookingDate.toLocaleString()).getDay()]
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
              workDay: dayNames[new Date(createBookingDto.bookingDate.toLocaleString()).getDay()]
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

