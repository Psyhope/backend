import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Booking {
  @Field(() => Int)
  id: number;

  @Field(()=> Date)
  bookingDate: Date;

  @Field(() => String)
  bookingType: String

  @Field(() => String)
  reasonApply: String;

  @Field(() => Boolean)
  closestKnown: Boolean;

  @Field(() => Int)
  number_1: number;

  @Field(() => Int)
  number_2: number;

  @Field(() => Int)
  number_3: number;

  @Field(() => Int)
  number_4: number;

  @Field(() => Int)
  number_5: number;

  @Field(() => Int)
  number_6: number;

  @Field(() => Int)
  number_7: number;

  @Field(() => Int)
  number_8: number;

  @Field(() => Int)
  number_9: number;

  @Field(() => Int)
  number_10: number;

  @Field(() => Int)
  number_11: number;

  @Field(() => Int)
  number_12: number;
}
