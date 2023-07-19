import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateArticleInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  content: string;

  @Field(() => String)
  posterUrl: string;

  @Field(() => String)
  thumbnailUrl: string;
}
