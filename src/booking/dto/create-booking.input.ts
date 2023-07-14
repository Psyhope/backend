import { InputType, Int, Field } from '@nestjs/graphql';
import { CounselorType } from '../entities/booking.entity';

@InputType()
export class CreateBookingInput {
  @Field(() => Date)
  bookingDate: Date;
  
  @Field(() => String)
  bookingTime: string

  @Field(() => CounselorType)
  counselorType: CounselorType

  @Field(() => String)
  reasonApply: string

  @Field(() => Boolean)
  closestKnown: boolean

  @Field(() => Int)
  number_1: number;

  @Field(() => Int)
  number_2: number;

  @Field(() => Int)
  number_3: number;

  @Field(() => Int)
  number_4: number;

  @Field(() => Int)
  number_5: number;

  @Field(() => Int)
  number_6: number;

  @Field(() => Int)
  number_7: number;

  @Field(() => Int)
  number_8: number;

  @Field(() => Int)
  number_9: number;

  @Field(() => Int)
  number_10: number;

  @Field(() => Int)
  number_11: number;

  @Field(() => Int)
  number_12: number;

}
