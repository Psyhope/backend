import { Topic } from '../entities/const.entity';
import { CreateBookingInput } from './create-booking.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateBookingInput extends PartialType(CreateBookingInput) {
  @Field(() => Int)
  id: number;

  @Field(() => Date)
  bookingDate: Date;
  
  @Field(() => String)
  bookingTime: string;

  @Field(() => [Topic])
  bookingTopic: Topic[];

  @Field(() => String)
  reasonApply: string

  @Field(() => Boolean)
  closestKnown: boolean
}
