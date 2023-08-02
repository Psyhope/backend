import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OnboardingService } from './onboarding.service';
import { CreateOnboardingInput } from './dto/create-onboarding.input';

import { UseGuards } from '@nestjs/common';
import { LoggedIn } from 'src/guards/loggedIn.guard';
import { CurrentUser } from 'src/auth/decorator/currentUser.decorator';
import { JwtPayload } from 'src/auth/interfaces/jwt.payload';
import { UserRepositories } from 'src/models/user.repo';
import { User } from 'src/user/models/user.model';

@Resolver(() => User)
export class OnboardingResolver {
  constructor(private readonly onboardingService: OnboardingService, private readonly userRepo: UserRepositories) {}

  @Mutation(() => User)
  @UseGuards(LoggedIn)
  async createOnboarding(@Args('createOnboardingInput') createOnboardingInput: CreateOnboardingInput, @CurrentUser() user: JwtPayload) {
    return this.onboardingService.create(createOnboardingInput, user.sub);
  }
}
