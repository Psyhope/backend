import { CreateBookingInput } from './create-booking.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateBookingInput{
  @Field(() => Int)
  id: number;

  @Field(() => Date)
  bookingDate: Date;
  
  @Field(() => String)
  bookingTime: string;

  @Field(() => String)
  bookingTime2: string;
}
