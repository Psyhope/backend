import { Test, TestingModule } from '@nestjs/testing';
import { CounselingLogService } from './counseling-log.service';

describe('CounselingLogService', () => {
  let service: CounselingLogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CounselingLogService],
    }).compile();

    service = module.get<CounselingLogService>(CounselingLogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
