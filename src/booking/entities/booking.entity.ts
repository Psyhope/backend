import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { User } from 'src/user/models/user.model';
import { CounselorType, Topic } from './const.entity';
import { Councelor } from './counselor.entity';

@ObjectType()
export class Booking {
  @Field(() => Int)
  id: number;

  @Field(() => String, { description: 'The time of the booking' })
  bookingTime: string;

  @Field(() => String, { description: 'The time of the booking' })
  bookingTime2: string;

  @Field(() => Date, { description: 'The time of the booking' })
  bookingDate: Date;

  @Field(() => String)
  bookingDay: string

  @Field(() => User, {nullable: true})
  user: User;

  @Field(() => String)
  userId: string;

  @Field(() => CounselorType, { defaultValue: CounselorType.PSYHOPE, nullable: false })
  counselorType: CounselorType;

  @Field(() => [Topic], {nullable:false})
  bookingTopic: Topic[];

  @Field(() => String, { description: 'The reason for applying for a counseling session' })
  reasonApply: String;

  @Field(() => Boolean)
  closestKnown: Boolean;

  @Field(()=> Councelor, {nullable: true})
  councelor: Councelor
}