import { CreateEventInput } from './create-event.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateEventInput extends PartialType(CreateEventInput) {
  @Field(() => Int)
  id: number;

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
