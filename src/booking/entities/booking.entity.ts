import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';

export enum CounselorType {
  PSYHOPE = "PSYHOPE",
  FACULTY = "FACULTY"
}

@ObjectType()
export class Booking {
  @Field(() => Int)
  id: number;

  @Field(() => Date, { description: 'The time of the booking' })
  time: Date;

  @Field(() => String)
  userId: string;

  @Field(() => CounselorType, { defaultValue: CounselorType.PSYHOPE, nullable: false })
  counselorType: CounselorType;

  @Field(() => String, { description: 'The reason for applying for a counseling session' })
  reasonApply: String;

  @Field(() => Boolean)
  closestKnown: Boolean;

  @Field(() => [Int], {
    description: 'Answers for all 12 question on the booking form in order, each number from 1-4 corresponds to the options on the form'
  })
  answers: number;
}

registerEnumType(CounselorType, {
  name: 'CounselorType',
  description: 'The type of counselor, either PSYHOPE or FACULTY',
})