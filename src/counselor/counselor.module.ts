import { Module } from '@nestjs/common';
import { CounselorService } from './counselor.service';
import { CounselorResolver } from './counselor.resolver';
import { DbService } from 'src/providers/database/db';
import { UserRepositories } from 'src/models/user.repo';
import { SSOAuthService } from 'src/auth/providers/sso.service';

@Module({
  providers: [CounselorResolver, CounselorService, DbService, UserRepositories, SSOAuthService],
  exports: [CounselorService, CounselorModule, CounselorResolver, DbService]
})
export class CounselorModule {}
