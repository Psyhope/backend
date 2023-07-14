import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';
import {CounselorType} from './booking.entity'

@ObjectType()
export class CouncelorSchedule {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  workDay: string;

  @Field(() => String)
  workTime: string
}