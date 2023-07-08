import { Module } from '@nestjs/common';
import { InfograficService } from './infografic.service';
import { InfograficResolver } from './infografic.resolver';
import { DbService } from 'src/providers/database/db';

@Module({
  providers: [InfograficResolver, InfograficService, DbService],
  exports: [DbService],
})
export class InfograficModule {}
