import { Query, Resolver } from '@nestjs/graphql';
import { User } from './models/user.model';
import { UserRepositories } from 'src/models/user.repo';
import { CurrentUser } from 'src/auth/decorator/currentUser.decorator';
import { UseGuards } from '@nestjs/common';
import { LoggedIn } from 'src/guards/loggedIn.guard';
import { JwtPayload } from 'src/auth/interfaces/jwt.payload';
import { BookingRepositories } from 'src/models/booking.repo';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userRepo: UserRepositories,
    private readonly bookingRepo: BookingRepositories
  ) { }

  @Query(() => User)
  @UseGuards(LoggedIn)
  async user(@CurrentUser() user: JwtPayload) {
    const { username, fullname, account, isOnboarded, lineAcc, igAcc } =
      await this.userRepo.findById(user.sub);
    const bookings = await this.bookingRepo.findMany({
      where: {
        userId: user.sub
      }
    })
    const { role, gender, faculty, major } = account;
    return {
      id: user.sub,
      username,
      isOnboarded,
      account: {
        faculty,
        gender,
        major,
        role,
      },
      lineAcc,
      igAcc,
    };
  }
}
