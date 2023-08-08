import { CreateBookingInput } from './create-booking.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class AdminTermiate  {
  @Field(() => Int)
  id: number;
}
