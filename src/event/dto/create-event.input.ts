import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateEventInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  date: string;

  @Field(() => String)
  location: string;

  @Field(() => String)
  time: string;

  @Field(() => String)
  description: string;

  @Field(() => String)
  posterUrl: string;
}
