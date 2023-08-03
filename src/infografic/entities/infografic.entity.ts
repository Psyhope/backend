import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Infografic {
  @Field(() => Int)
  id: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;

  @Field(() => [String])
  infograficUrl: string[];
}
