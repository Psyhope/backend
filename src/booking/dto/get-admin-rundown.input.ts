import { InputType, Field} from '@nestjs/graphql';
@InputType()
export class GetAdminRundown{

  @Field(() => Date, { nullable : true })
  day: Date;
}
