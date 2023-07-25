import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingResolver } from './booking.resolver';
import { DbService } from 'src/providers/database/db';
import { UserRepositories } from 'src/models/user.repo';
import { SSOAuthService } from 'src/auth/providers/sso.service';
import { BookingRepositories } from 'src/models/booking.repo';
import { RescheduleRequestRepositories } from 'src/models/requestReschedule.repo';

@Module({
  providers: [BookingResolver, BookingService, DbService, UserRepositories, SSOAuthService, BookingRepositories, RescheduleRequestRepositories],
  exports: [BookingService, BookingRepositories, BookingResolver, DbService, RescheduleRequestRepositories]
})
export class BookingModule { }
