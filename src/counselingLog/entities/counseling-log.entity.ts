import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from 'src/user/models/user.model';

@ObjectType()
export class CounselingLog {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  userId: string

  @Field(() => User)
  client: User

  @Field(() => Int)
  bookingId: number

  @Field(() => Date)
  time: Date

  @Field(() => String)
  detail: string
}
