import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventResolver } from './event.resolver';
import { DbService } from 'src/providers/database/db';
import { EventRepositories } from 'src/models/event.repo';
import { SSOAuthService } from 'src/auth/providers/sso.service';
import { UserRepositories } from 'src/models/user.repo';

@Module({
  providers: [
    EventResolver,
    EventService,
    DbService,
    EventRepositories,
    UserRepositories,
    SSOAuthService,
  ],
  exports: [
    EventResolver,
    EventService,
    DbService,
    EventRepositories,
    UserRepositories,
    SSOAuthService,
  ],
})
export class EventModule {}
