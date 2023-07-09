import { Module } from '@nestjs/common';
import { UserRepositories } from 'src/models/user.repo';
import { UserResolver } from './user.resolver';
import { DbService } from 'src/providers/database/db';
import { SSOAuthService } from 'src/auth/providers/sso.service';

@Module({
<<<<<<< HEAD
    providers: [UserRepositories, UserResolver, DbService, SSOAuthService],
    exports: [UserRepositories, DbService, SSOAuthService, UserResolver]
})
export class UserModule { }
=======
  providers: [UserRepositories, UserResolver, DbService, SSOAuthService],
  exports: [UserRepositories, DbService, SSOAuthService, UserResolver],
})
export class UserModule {}
>>>>>>> 7fdee32e9e550da9a133fd842fb57bdadc9e8bfa
