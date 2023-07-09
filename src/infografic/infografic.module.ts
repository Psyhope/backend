import { Module } from '@nestjs/common';
import { InfograficService } from './infografic.service';
import { InfograficResolver } from './infografic.resolver';
import { DbService } from 'src/providers/database/db';
import { InfograficRepositories } from 'src/models/infografic.repo';

@Module({
  providers: [
    InfograficResolver,
    InfograficService,
    DbService,
    InfograficRepositories,
  ],
  exports: [
    InfograficResolver,
    InfograficService,
    DbService,
    InfograficRepositories,
  ],
})
export class InfograficModule { }
