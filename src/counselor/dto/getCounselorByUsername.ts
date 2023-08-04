import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class GetCouncelor {
  @Field(() => String, {nullable:true})
  username: string
}
