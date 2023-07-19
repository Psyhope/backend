import { Module } from '@nestjs/common';
import { InfograficService } from './infografic.service';
import { InfograficResolver } from './infografic.resolver';
import { DbService } from 'src/providers/database/db';
import { InfograficRepositories } from 'src/models/infografic.repo';
import { UserRepositories } from 'src/models/user.repo';
import { SSOAuthService } from 'src/auth/providers/sso.service';

@Module({
  providers: [
    InfograficResolver,
    InfograficService,
    DbService,
    InfograficRepositories,
    UserRepositories,
    SSOAuthService,
  ],
  exports: [
    InfograficResolver,
    InfograficService,
    DbService,
    InfograficRepositories,
    UserRepositories,
    SSOAuthService,
  ],
})
export class InfograficModule { }
