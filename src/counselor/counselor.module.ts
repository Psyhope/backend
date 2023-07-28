import { Module } from '@nestjs/common';
import { CounselorService } from './counselor.service';
import { CounselorResolver } from './counselor.resolver';

@Module({
  providers: [CounselorResolver, CounselorService]
})
export class CounselorModule {}
