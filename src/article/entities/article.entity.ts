import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Article {
  @Field(() => Int)
  id: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => String)
  title: string;

  @Field(() => String)
  content: string;

  @Field(() => String)
  posterUrl: string;

  @Field(() => String)
  thumbnailUrl: string;
}
