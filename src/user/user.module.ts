import { Module } from '@nestjs/common';
import { UserRepositories } from 'src/models/user.repo';
import { UserResolver } from './user.resolver';
import { DbService } from 'src/providers/database/db';
import { SSOAuthService } from 'src/auth/providers/sso.service';

@Module({
  providers: [UserRepositories, UserResolver, DbService, SSOAuthService],
  exports: [UserRepositories, DbService, SSOAuthService, UserResolver],
})
export class UserModule {}
