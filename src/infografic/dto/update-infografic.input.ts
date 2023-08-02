import { CreateInfograficInput } from './create-infografic.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateInfograficInput extends PartialType(CreateInfograficInput) {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;

  @Field(() => [String])
  infograficUrl: string[];
}
