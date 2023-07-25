import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class RejectBookingDTO{
  @Field(() => Int)
  id: number;
}
