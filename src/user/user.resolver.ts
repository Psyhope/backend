<<<<<<< HEAD
import { Query, Resolver } from "@nestjs/graphql";
import { User } from "./models/user.model";
import { UserRepositories } from "src/models/user.repo";
import { CurrentUser } from "src/auth/decorator/currentUser.decorator";
import { UseGuards } from "@nestjs/common";
import { LoggedIn } from "src/guards/loggedIn.guard";
import { JwtPayload } from "src/auth/interfaces/jwt.payload";

@Resolver(() => User)
export class UserResolver {
    constructor(
        private readonly userRepo: UserRepositories
    ) { }

    @Query(() => User)
    @UseGuards(LoggedIn)
    async user(@CurrentUser() user: JwtPayload): Promise<User> {
        const { username, fullname, account } = await this.userRepo.findById(user.sub);
        const { role, gender, faculty, major } = account;
        return {
            id: user.sub,
            username,
            fullname,
            account: {
                faculty,
                gender,
                major,
                role
            }
        };
    }
}
=======
import { Query, Resolver } from '@nestjs/graphql';
import { User } from './models/user.model';
import { UserRepositories } from 'src/models/user.repo';
import { CurrentUser } from 'src/auth/decorator/currentUser.decorator';
import { UseGuards } from '@nestjs/common';
import { LoggedIn } from 'src/guards/loggedIn.guard';
import { JwtPayload } from 'src/auth/interfaces/jwt.payload';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userRepo: UserRepositories) {}

  @Query(() => User)
  @UseGuards(LoggedIn)
  async user(@CurrentUser() user: JwtPayload): Promise<User> {
    const { username, fullname, account, isOnboarded, lineAcc, igAcc } =
      await this.userRepo.findById(user.sub);
    const { role, gender, faculty, major } = account;
    return {
      id: user.sub,
      username,
      fullname,
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
>>>>>>> 7fdee32e9e550da9a133fd842fb57bdadc9e8bfa
