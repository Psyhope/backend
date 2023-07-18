import { Test, TestingModule } from '@nestjs/testing';
import { CounselingLogResolver } from './counseling-log.resolver';
import { CounselingLogService } from './counseling-log.service';

describe('CounselingLogResolver', () => {
  let resolver: CounselingLogResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CounselingLogResolver, CounselingLogService],
    }).compile();

    resolver = module.get<CounselingLogResolver>(CounselingLogResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
