import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Onboarding {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
