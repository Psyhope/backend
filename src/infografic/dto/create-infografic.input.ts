import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateInfograficInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;

  @Field(() => [String])
  infograficUrl: string[];
}
