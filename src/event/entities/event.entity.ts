import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Event {
  @Field(() => Int)
  id: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => String)
  title: string;

  @Field(() => Date)
  date: Date;

  @Field(() => String)
  location: string;

  @Field(() => String)
  time: string;

  @Field(() => String)
  description: string;

  @Field(() => String)
  posterUrl: string;
}
