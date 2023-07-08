import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventResolver } from './event.resolver';
import { DbService } from 'src/providers/database/db';

@Module({
  providers: [EventResolver, EventService, DbService],
  exports: [DbService],
})
export class EventModule {}
