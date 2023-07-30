import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class GetCouncelorFilter {
  @Field(() => String, {nullable:true})
  counselorName: string

  @Field(() => String, {nullable: true})
  bookingDay: string
}
