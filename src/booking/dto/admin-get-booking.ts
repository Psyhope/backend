
import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class AdminGetBooking{
  @Field(() => Int)
  id: number;
}
