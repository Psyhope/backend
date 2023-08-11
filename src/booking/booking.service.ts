
import { Injectable } from '@nestjs/common';
import { Councelor, Prisma } from '@prisma/client';
import { dayNames } from './const';
import { CounselorType } from './entities/const.entity';
import { UserRepositories } from 'src/models/user.repo';
import { DbService } from 'src/providers/database/db';
import { UpdateBookingInput } from './dto/update-booking.input';
import { MailService } from 'src/mail/mail.service';
import { Channel } from 'src/user/models/user.model';

@Injectable()
export class BookingService {
  constructor(private readonly db: DbService, private readonly mail: MailService) { }

  async create(createBookingDto: Prisma.BookingCreateInput, channel: string, username: string) {
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
  
  async adminGetBookingService(bookingId : number){
    return await this.db.booking.findUnique({
      where: {
        id: bookingId,
      },
      include: {
        CounselingLog: true,
        councelor: {
          include: {
            user: {
              include:{
                account: true
              }
            }
          }
        },
        user:{
          include: {
            account: true
          }
        }
      }
    })
  }

  async accept(id: number) {
    try {
      const booking = await this.db.booking.update({
        where: {
          id,
        },
        data: {
          isAccepted: true,
        },
        include: {
          user: {
            include: {
              account: true
            }
          },
        }
      })
      await this.mail.sendMail({
        username : booking.user.username,
        subject: "Pendaftaran Konseling Sebaya Telah Diterima!",
        html: `
        <p>Halo ${booking.user.username},</p>
        <p>Terima kasih telah mempercayakan layanan peer counselor Psyhope UI 2023. Kami telah menerima pendaftaran konselingmu. Tenang saja, kerahasiaan data kamu akan kami jaga.</p>
        <p></p>
        <p>Berikut adalah detail jadwal konseling yang telah dipilih:</p>
        <p>Hari : ${booking.bookingDay}</p>
        <p>Jam : ${booking.bookingTime} -- ${booking.bookingTime2}</p>
        <p>Platform Konseling: ${booking.user.account.channel}</p>
        <p></p>
        <p>Dimohon untuk menghadiri sesi konseling sebaya secara tepat waktu sesuai dengan jadwal yang telah dipilih.</p>
        <p></p>
        <p>Sampai bertemu di sesi konseling sebaya Psyhope 😊</p>
        <p></p>
        <p>Email ini merupakan pesan otomatis, dimohon untuk tidak membalas email ini. Silahkan hubungi OA LINE Psyhope UI (@907acnot) atau Instagram (psyhope.ui) untuk informasi lebih lanjut sesuai dengan platform konseling yang dipilih.</p>
        <p></p>
        <p>Psyhope UI 2023</p>
        <p></p>
        <p>#HopeIsOnYourSide</p>
        <p>Terima kasih.</p>
        `
      })
      return booking;
    } catch (error) {
      throw new Error(error);
    }
  }

  async acceptAdmin(id: number, faculty: string) {

    const booking = await this.db.booking.findUnique({
      where: {
        id,
      },
      include: {
        user: {
          include : {
            account :true
          }
        }
      }
    })

    const bookingAccepted = await this.db.booking.findUnique({
      where: {
        id,
      },
      include: {
        user: {
          select: {
            fullname: true,
            username: true
          }
        }
      }
    })
    

    // kasih info kalo udh dirandom tp tetep null ya gbs -> send mailer kalo harus ganti jadwal / gabisa di proses konselingnya
    // kalo dia gak null, kasih email ke counselornya bahwa ada pasien yang mau ke dia 
    const randomizedCouncelor = (bookingAccepted.counselorType == "FACULTY") ? (
      await this.db.councelor.findFirst({
        where: {
          councelorSchedule: {
            some: {
              workDay: bookingAccepted.bookingDay,
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
        },
        include: {
          user: {
            select: {
              username: true,
              fullname: true,
            }
          }
        }
      })
    ) : (
      await this.db.councelor.findFirst({
        where: {
          councelorSchedule: {
            some: {
              workDay: bookingAccepted.bookingDay,
              workTime: {
                has: bookingAccepted.bookingTime
              }
            },
          },
          counselorType: bookingAccepted.counselorType,
        },
        include: {
          user: true
        }
      })
    )

    if (randomizedCouncelor == null) {
      await this.mail.sendMail({
        username: bookingAccepted.user.username,
        subject: "Konseling Anda Telah Diterima",
        html: `
        <p>Halo ${bookingAccepted.user.fullname},</p>
        <p>Permintaan konseling Anda telah diterima oleh kami. Namun, kami belum menemukan konselor yang sesuai dengan jadwal Anda. Silahkan cek jadwal konseling Anda di aplikasi kami.</p>
        <p>Terima kasih.</p>
        `
      })
      return await this.db.booking.update({
        where: {
          id,
        },
        data: {
          adminAcc: false,
          isAccepted: false,
          isTerminated: true,
        }
      })
    } else {

      return this.db.booking.update({
        where: {
          id,
        },
        data: {
          adminAcc: true,
          councelor: {
            connect: {
              id: randomizedCouncelor.id
            }
          }
        }
      })
    }
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
      },
      include: {
        user: {
          select: {
            fullname: true,
            username: true
          }
        },
      }
    })

    let counselorIdAvailable: string[] = []
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
    // kalo lenght == 9, kirim email bahwa konsulnya gabisa diproses, 
    // silahkah reschedule
    if (availableCounselor.length == 0) {
      await this.mail.sendMail({
        username: updateBlacklist.user.username,
        subject: "Konseling Anda Tidak Dapat Diproses",
        html: `
        <p>Halo ${updateBlacklist.user.fullname},</p>
        <p>Konseling Anda tidak dapat diproses karena tidak ada konselor yang tersedia. Silahkan lakukan reschedule konseling Anda.</p>
        <p>Terima kasih.</p>
        `
      })

      return this.db.booking.update({
        where: {
          id,
        },
        data: {
          adminAcc: false,
          isTerminated: true,
          isAccepted: false,
        }
      })
    }

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
        bookingDay: dayNames[new Date(updateBookingInput.bookingDate).getDay()],
        isAccepted: false,
        isTerminated: false,
        adminAcc: false,
        councelor: {
          disconnect: true,
        },
      }
    })

  }

  async terminateAdmin(bookingId: number){
    return await this.db.booking.update({
      where: {
        id: bookingId,
      },
      data: {
        isTerminated: true
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

