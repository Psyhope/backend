import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CounselorType } from '../entities/const.entity';

@InputType()
export class GetScheduleDTO{
  @Field(() => Date)
  day: Date;

  @Field(() => String)
  dayTime: string;

  @Field(() => CounselorType)
  counselorType: CounselorType;
}
