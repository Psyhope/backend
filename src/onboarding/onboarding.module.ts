import { Module } from '@nestjs/common';
import { OnboardingService } from './onboarding.service';
import { OnboardingResolver } from './onboarding.resolver';
import { DbService } from 'src/providers/database/db';
import { UserRepositories } from 'src/models/user.repo';
import { SSOAuthService } from 'src/auth/providers/sso.service';

@Module({
  providers: [OnboardingResolver, OnboardingService, DbService, UserRepositories, SSOAuthService],
  exports: [OnboardingModule, OnboardingResolver, OnboardingService, DbService]
})
export class OnboardingModule {}
