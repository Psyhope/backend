import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateOnboardingInput {

  @Field(() => String)
  socmed: string

  @Field(() => String)
  linkSocmed: string
}
