import { InputType, Field} from '@nestjs/graphql';
import { CounselorType, StatusRequest } from '../entities/const.entity';

@InputType()
export class GetBookingFilterGeneralDto{

  @Field(() => Date, { nullable : true })
  day: Date;

  @Field(() => CounselorType, {nullable: true})
  counselorType: CounselorType
}
