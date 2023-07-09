import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingResolver } from './booking.resolver';
import { DbService } from 'src/providers/database/db';
import { UserRepositories } from 'src/models/user.repo';
import { SSOAuthService } from 'src/auth/providers/sso.service';

@Module({
  providers: [BookingResolver, BookingService, DbService, UserRepositories, SSOAuthService],
  exports: [BookingService, BookingResolver, DbService]
})
export class BookingModule { }
