import { Module } from '@nestjs/common';
import { CounselingLogService } from './counseling-log.service';
import { CounselingLogResolver } from './counseling-log.resolver';
import { DbService } from 'src/providers/database/db';
import { UserRepositories } from 'src/models/user.repo';
import { SSOAuthService } from 'src/auth/providers/sso.service';

@Module({
  providers: [CounselingLogResolver, CounselingLogService, DbService, UserRepositories, SSOAuthService]
})
export class CounselingLogModule {}
