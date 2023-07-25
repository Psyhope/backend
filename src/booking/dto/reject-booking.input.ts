import { CreateBookingInput } from './create-booking.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class RejectBookingInput extends PartialType(CreateBookingInput) {
  @Field(() => Int)
  id: number;
}
