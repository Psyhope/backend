import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventResolver } from './event.resolver';
import { DbService } from 'src/providers/database/db';
import { EventRepositories } from 'src/models/event.repo';

@Module({
  providers: [EventResolver, EventService, DbService, EventRepositories],
  exports: [EventResolver, EventService, DbService, EventRepositories],
})
export class EventModule { }
