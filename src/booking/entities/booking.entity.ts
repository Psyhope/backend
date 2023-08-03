import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { User } from 'src/user/models/user.model';
import { CounselorType } from './const.entity';
import { Councelor } from './counselor.entity';
import { CounselingLog } from 'src/counselingLog/entities/counseling-log.entity';

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

  @Field(() => String, { description: 'The reason for applying for a counseling session' })
  reasonApply: String;

  @Field(() => Boolean)
  closestKnown: Boolean;

  @Field(()=> Councelor, {nullable: true})
  councelor: Councelor

  @Field(() => Boolean)
  isAccepted: boolean

  @Field(() => Boolean)
  isTerminated: boolean

  @Field(() => Boolean)
  adminAcc: boolean

  @Field(() => [CounselingLog], {nullable:true})
  CounselingLog: CounselingLog[]

  @Field(() => Int)
  number_1: number;

  @Field(() => Int)
  number_2: number;

  @Field(() => Int)
  number_3: number;

  @Field(() => Int)
  number_4: number;

  @Field(() => Int)
  number_5: number;

  @Field(() => Int)
  number_6: number;

  @Field(() => Int)
  number_7: number;

  @Field(() => Int)
  number_8: number;

  @Field(() => Int)
  number_9: number;

  @Field(() => Int)
  number_10: number;

  @Field(() => Int)
  number_11: number;

  @Field(() => Int)
  number_12: number;

  @Field(() => Boolean)
  isSuicidal: boolean
}