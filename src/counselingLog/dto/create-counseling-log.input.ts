import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCounselingLogInput {
  @Field(() => Int)
  bookingId: number;

  @Field(() => String)
  detail: string;

  @Field(() => String)
  title: string;

  @Field(() => Date)
  time: Date;
}
