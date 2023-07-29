import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BookingService } from './booking.service';
import { Booking } from './entities/booking.entity';
import { CreateBookingInput } from './dto/create-booking.input';
import { UseGuards } from '@nestjs/common';
import { LoggedIn } from 'src/guards/loggedIn.guard';
import { RescheduleRequest } from './entities/rescheduleRequest.entity';
import { CurrentUser } from 'src/auth/decorator/currentUser.decorator';
import { JwtPayload } from 'src/auth/interfaces/jwt.payload';
import { UserRepositories } from 'src/models/user.repo';
import { GetScheduleDTO } from './dto/getSchedule.input';
import { CouncelorSchedule } from './entities/councelorSchedule.entity';
import { RejectBookingDTO } from './dto/rejectBooking.input';
import { AcceptBooking } from './dto/accept-booking.input';
import { AdminAccBooking } from './dto/admin-acc.input';
import { GetBookingFilterDto } from './dto/get-booking-filter.input';
import { get } from 'http';
import { StatusRequest } from './entities/const.entity';
import { dayNames } from './const';
import { UpdateBookingInput } from './dto/update-booking.input';
import { GetBookingFilterGeneralDto } from './dto/get-booking-generat.input';
import { log } from 'console';

@Resolver(() => Booking)
export class BookingResolver {
  constructor(private readonly bookingService: BookingService, private readonly userRepo: UserRepositories) { }

  @Mutation(() => Booking, { nullable: true })
  @UseGuards(LoggedIn)
  async createBooking(@CurrentUser() user: JwtPayload, @Args('createBookingInput') createBookingInput: CreateBookingInput) {
    const _user = await this.userRepo.findById(user.sub);
    return this.bookingService.create({
      ...createBookingInput,
      user: {
        connect: {
          id: user.sub
        }
      }
    },
      _user.account.faculty);
  }

  @Query(() => Booking, {name:'bookingClient', nullable: true})
  @UseGuards(LoggedIn)
  async bookingClient(@CurrentUser() user: JwtPayload){
    const _user = await this.userRepo.findById(user.sub)
    if (user.role != "CLIENT") return null;
    return this.bookingService.findClient(_user.id)
  }

  @Query(() => [Booking], { name: 'booking', nullable: true })
  @UseGuards(LoggedIn)
  async bookings(@CurrentUser() user: JwtPayload) {
    const { role } = user;
    const _user = await this.userRepo.findById(user.sub);
    switch (role) {
      case "CLIENT":
        return await this.bookingService.findAll({
          where: { userId: user.sub }
        })
      case "FACULTY_ADMIN":
        return await this.bookingService.findAll({
          where: {
            counselorType: 'FACULTY',
            user: {
              account: {
                faculty: _user.account.faculty
              }
            }
          }
        })
      case "FACULTY_COUNSELOR":
        return await this.bookingService.findAll({
          where: {
            counselorType: 'FACULTY',
            user: {
              account: {
                faculty: _user.account.faculty
              }
            },
            councelor: {
              userId: user.sub
            }
          }
        })
      case "PSYHOPE_COUNSELOR":
        return await this.bookingService.findAll({
          where: {
            counselorType: "PSYHOPE",
            councelor: {
              userId: user.sub
            }
          }
        })
      case "PSYHOPE_ADMIN":
        return await this.bookingService.findAll({
          where: {
            counselorType: "PSYHOPE"
          }
        })
          ;
    }
  }

  @Query(() => [Booking], { name: 'bookingFilter', nullable: true })
  @UseGuards(LoggedIn)
  async filterBooking(@CurrentUser() user: JwtPayload, @Args('getBookingFilter') getBookingFilter: GetBookingFilterDto) {
    const { role } = user;
    const _user = await this.userRepo.findById(user.sub);
    if (getBookingFilter.day == null && getBookingFilter.status == null) return null
    switch (role) {
      case "FACULTY_ADMIN":
        if (getBookingFilter.day == null && getBookingFilter.status != null) {
          return await this.bookingService.findAll({
            where: {
              counselorType: 'FACULTY',
              adminAcc: getBookingFilter.status == StatusRequest.ACCEPTED,
              user: {
                account: {
                  faculty: _user.account.faculty
                }
              }
            }
          })
        }
        else if (getBookingFilter.day != null && getBookingFilter.status == null) {
          return await this.bookingService.findAll({
            where: {
              counselorType: 'FACULTY',
              bookingDay: dayNames[getBookingFilter.day.getDay()],
              user: {
                account: {
                  faculty: _user.account.faculty
                }
              }
            }
          })
        }
        else {
          return await this.bookingService.findAll({
            where: {
              counselorType: 'FACULTY',
              adminAcc: getBookingFilter.status == StatusRequest.ACCEPTED,
              bookingDay: dayNames[getBookingFilter.day.getDay()],
              user: {
                account: {
                  faculty: _user.account.faculty
                }
              }
            }
          })
        }
      case "PSYHOPE_ADMIN":
        if (getBookingFilter.day == null && getBookingFilter.status != null) {
          return await this.bookingService.findAll({
            where: {
              counselorType: 'PSYHOPE',
              adminAcc: getBookingFilter.status == StatusRequest.ACCEPTED,
            }
          })
        }
        else if (getBookingFilter.day != null && getBookingFilter.status == null) {
          return await this.bookingService.findAll({
            where: {
              counselorType: 'PSYHOPE',
              bookingDay: dayNames[getBookingFilter.day.getDay()],
            }
          })
        }
        else {
          return await this.bookingService.findAll({
            where: {
              counselorType: 'PSYHOPE',
              adminAcc: getBookingFilter.status == StatusRequest.ACCEPTED,
              bookingDay: dayNames[getBookingFilter.day.getDay()],
            }
          })
        }
        ;
    }
  }

  @Query(() => [Booking], { name: 'bookingFilterGeneral', nullable: true })
  @UseGuards(LoggedIn)
  async filterBookingGeneral(@CurrentUser() user: JwtPayload, @Args('getBookingFilterGeneral') getBookingFilter: GetBookingFilterGeneralDto) {
    const _user = await this.userRepo.findById(user.sub);

    if(getBookingFilter.counselorType == null || getBookingFilter.day == null) return null

    if (getBookingFilter.counselorType == "PSYHOPE"){
      return await this.bookingService.findAll({
        where: {
          counselorType: "PSYHOPE",
          adminAcc: true,
          isAccepted: true,
          isTerminated: false,
          bookingDay: dayNames[getBookingFilter.day.getDay()],
        }
      })
    }
    else {
      return await this.bookingService.findAll({
        where: {
          counselorType: 'FACULTY',
          adminAcc: true,
          isAccepted: true,
          isTerminated: false,
          bookingDay: dayNames[getBookingFilter.day.getDay()],
          user: {
            account: {
              faculty: _user.account.faculty
            }
          }
        }
      })
    }
  }
  

  @Query(() => [CouncelorSchedule], { name: 'schedule', nullable: true })
  @UseGuards(LoggedIn)
  async getSchedule(@CurrentUser() user: JwtPayload, @Args('getScheduleDTO') getScheduleDTO: GetScheduleDTO) {
    const _user = await this.userRepo.findById(user.sub);
    return await this.bookingService.getSchedule(getScheduleDTO.day, getScheduleDTO.counselorType, _user.account.faculty, getScheduleDTO.dayTime, getScheduleDTO.dayTime2);
  }

  @Mutation(() => Booking, { nullable: true })
  @UseGuards(LoggedIn)
  async rejectBooking(@Args('rejectBookingInput') rejectBookingInput: RejectBookingDTO, @CurrentUser() user: JwtPayload) {
    const _user = await this.userRepo.findById(user.sub);
    return this.bookingService.reject(rejectBookingInput.id, _user.id, _user.account.faculty);
  }

  @Mutation(() => Booking, { nullable: true })
  @UseGuards(LoggedIn)
  async acceptBooking(@Args('accBookingInput') accBookingInput: AcceptBooking, @CurrentUser() user: JwtPayload) {
    const _user = await this.userRepo.findById(user.sub);
    if (_user.account.role == "CLIENT") return null;
    return this.bookingService.accept(accBookingInput.id);
  }

  @Mutation(() => Booking, { nullable: true })
  @UseGuards(LoggedIn)
  async adminAcc(@Args('adminAccInput') adminAccInput: AdminAccBooking, @CurrentUser() user: JwtPayload) {
    const _user = await this.userRepo.findById(user.sub);
    if (_user.account.role == "FACULTY_ADMIN" || _user.account.role == "PSYHOPE_ADMIN") return this.bookingService.acceptAdmin(adminAccInput.id, _user.account.faculty)
    return null;
  }

  @Mutation(() => Booking)
  @UseGuards(LoggedIn)
  async rescheduleBooking(@Args('rescheduleBookingInput') rescheduleBooing: UpdateBookingInput) {
    return this.bookingService.update(rescheduleBooing)
  }

}
