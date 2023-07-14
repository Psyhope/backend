import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';
import {CounselorType} from './booking.entity'

@ObjectType()
export class Councelor {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  userId: string;

  @Field(() => Boolean)
  isOn: boolean

  @Field(() => CounselorType, { defaultValue: CounselorType.PSYHOPE, nullable: false })
  counselorType: CounselorType;
}