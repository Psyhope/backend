import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class GetLogById {
  @Field(() => Int)
  bookingId: number;;
}
