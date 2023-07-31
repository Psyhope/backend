
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { dayNames } from './const';
import { CounselorType } from './entities/const.entity';
import { UserRepositories } from 'src/models/user.repo';
import { DbService } from 'src/providers/database/db';
import { UpdateBookingInput } from './dto/update-booking.input';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class BookingService {
  constructor(private readonly db: DbService, private readonly mail: MailService) { }

  async create(createBookingDto: Prisma.BookingCreateInput, faculty: string) {
    // kasih pengecualian ketika yg dirandom == null -> kirim email buat batal
    return await this.db.booking.create({
      data: {
        bookingDay: dayNames[new Date(createBookingDto.bookingDate).getDay()],
        ...createBookingDto,
      }
    });
  }

  async findClient(userId: string) {
    return await this.db.booking.findFirst({
      include: {
        user: true,
        councelor: {
          include: {
            user: {
              include: {
                account: true
              }
            }
          }
        }
      },
      where: {
        userId,
      },
      orderBy: {
        id: 'desc'
      }
    })
  }

  async findAll(args: Prisma.BookingFindManyArgs) {
    return await this.db.booking.findMany({
      include: {
        user: {
          include: {
            account: true
          }
        },
        councelor: {
          include: {
            user: {
              include: {
                account: true
              }
            },
          }
        },
      },
      ...args
    });
  }

  async findByFilter(args: Prisma.BookingFindManyArgs) {
    return await this.db.booking.findMany({
      include: {
        user: true,
        councelor: {
          include: { user: true }
        },
      },
      ...args
    });
  }

  async accept(id: number) {
    // kasih email ke client kalo konsulnya udah dapet konselor
    return this.db.booking.update({
      where: {
        id,
      },
      data: {
        isAccepted: true,
      }
    })
  }

  async acceptAdmin(id: number, faculty: string) {
    const bookingAccepted = await this.db.booking.findUnique({
      where: {
        id,
      }
    })

    let randomizedCouncelor = null;
    // kasih info kalo udh dirandom tp tetep null ya gbs -> send mailer kalo harus ganti jadwal / gabisa di proses konselingnya
    // kalo dia gak null, kasih email ke counselornya bahwa ada pasien yang mau ke dia 
    if (bookingAccepted.counselorType == "FACULTY") {
      randomizedCouncelor = await this.db.councelor.findFirst({
        where: {
          councelorSchedule: {
            some: {
              workDay: dayNames[new Date(bookingAccepted.bookingDate.toLocaleString()).getDay()],
              workTime: {
                has: bookingAccepted.bookingTime
              }
            },
          },
          counselorType: bookingAccepted.counselorType,
          user: {
            account: {
              faculty,
            }
          },
          Booking: {
            none: {
              bookingTime: bookingAccepted.bookingTime,
              bookingDay: dayNames[bookingAccepted.bookingDate.getDay()],
              isTerminated: false,
            }
          }
        }
      })
    }
    else {
      randomizedCouncelor = await this.db.councelor.findFirst({
        where: {
          councelorSchedule: {
            some: {
              workDay: dayNames[new Date(bookingAccepted.bookingDate.toLocaleString()).getDay()],
              workTime: {
                has: bookingAccepted.bookingTime
              }
            },
          },
          counselorType: bookingAccepted.counselorType,
          Booking: {
            none: {
              bookingTime: bookingAccepted.bookingTime,
              bookingDay: dayNames[bookingAccepted.bookingDate.getDay()],
              isTerminated: false,
            }
          },
        }
      })
    }

    return this.db.booking.update({
      where: {
        id,
      },
      data: {
        adminAcc: true,
        councelor: {
          connect: {
            id: randomizedCouncelor.id,
          }
        }
      }
    })
  }

  async reject(id: number, userId: string, faculty: string) {

    // handle kalo yg ngereject bkn dia
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

    if (updateBlacklist.counselorType == "PSYHOPE") {
      allCounselor = await this.db.councelor.findMany({
        where: {
          counselorType: updateBlacklist.counselorType,
          councelorSchedule: {
            some: {
              workDay: dayNames[updateBlacklist.bookingDate.getDay()],
              workTime: {
                has: updateBlacklist.bookingTime
              }
            }
          },
          Booking: {
            none: {
              bookingDay: dayNames[updateBlacklist.bookingDate.getDay()],
              isTerminated: false,
              bookingTime: updateBlacklist.bookingTime
            }
          },
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
          councelorSchedule: {
            some: {
              workDay: dayNames[updateBlacklist.bookingDate.getDay()],
              workTime: {
                has: updateBlacklist.bookingTime
              }
            }
          },
          Booking: {
            none: {
              bookingDay: dayNames[updateBlacklist.bookingDate.getDay()],
              isTerminated: false,
              bookingTime: updateBlacklist.bookingTime
            }
          },
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

    // kalo gaada yg available ya kirim email
    // kalo lenght == 9, kirim email bahwa konsulnya gabisa diproses, silahkah reschedule
    if (availableCounselor.length != 0) {
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

  async update(updateBookingInput: UpdateBookingInput) {
    return await this.db.booking.update({
      where: {
        id: updateBookingInput.id
      },
      data: {
        bookingDate: updateBookingInput.bookingDate,
        bookingTime: updateBookingInput.bookingTime,
        bookingTime2: updateBookingInput.bookingTime2,
        isAccepted: false,
        isTerminated: false,
        adminAcc: false,
      }
    })

  }

  async getSchedule(bookingDate: Date, counselorType: CounselorType, faculty: string, bookingTime: string, bookingTime2: string) {

    // kalo ada ya ada kalo engga ya berarti valuenya disable
    if (counselorType == "PSYHOPE") {
      return await this.db.councelorSchedule.findMany({
        where: {
          workDay: dayNames[new Date(bookingDate.toLocaleString()).getDay()],
          councelor: {
            counselorType,
          }
        }
      })
    }

    else if (counselorType == "FACULTY") {
      return await this.db.councelorSchedule.findMany({
        where: {
          workDay: dayNames[new Date(bookingDate.toLocaleString()).getDay()],
          councelor: {
            counselorType,
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

