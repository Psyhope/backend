import { Module } from '@nestjs/common';
import { UserRepositories } from 'src/models/user.repo';
import { UserResolver } from './user.resolver';
import { DbService } from 'src/providers/database/db';
import { SSOAuthService } from 'src/auth/providers/sso.service';
import { BookingModule } from 'src/booking/booking.module';
import { BookingRepositories } from 'src/models/booking.repo';

@Module({
  providers: [UserRepositories, BookingRepositories, UserResolver, DbService, SSOAuthService, BookingModule],
  exports: [UserRepositories, DbService, SSOAuthService, UserResolver, BookingModule],
})
export class UserModule { }
