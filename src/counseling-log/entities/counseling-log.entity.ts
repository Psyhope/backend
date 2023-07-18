import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class CounselingLog {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  userId: string

  @Field(() => Int)
  bookingId: number

  @Field(() => Date)
  time: Date

  @Field(() => String)
  detail: string
}
