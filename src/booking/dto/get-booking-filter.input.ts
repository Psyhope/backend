import { InputType, Field} from '@nestjs/graphql';
import { StatusRequest } from '../entities/const.entity';

@InputType()
export class GetBookingFilterDto{

  @Field(() => String, { nullable : true })
  day: string;

  @Field(() => String, { nullable : true })
  dayTime: string;

  @Field(() => StatusRequest, { nullable: true })
  status: StatusRequest
}
