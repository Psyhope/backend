import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from 'src/user/models/user.model';

export enum CounselorType {
  PSYHOPE = "PSYHOPE",
  FACULTY = "FACULTY"
}

@ObjectType()
export class Booking {
  @Field(() => Int)
  id: number;

  @Field(()=> Date)
  time: Date;

  @Field(() => String)
  userId: string;

  @Field(() => CounselorType, {defaultValue : CounselorType.PSYHOPE, nullable: false})
  counselorType: CounselorType;

  @Field(() => String)
  reasonApply: String;

  @Field(() => Boolean)
  closestKnown: Boolean;

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
}
