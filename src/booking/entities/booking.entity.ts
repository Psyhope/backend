import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';

export enum CounselorType {
  PSYHOPE = "PSYHOPE",
  FACULTY = "FACULTY"
}

@ObjectType()
export class Booking {
  @Field(() => Int)
  id: number;

  @Field(() => String, { description: 'The time of the booking' })
  bookingTime: string;

  @Field(() => Date, { description: 'The time of the booking' })
  bookingDate: Date;

  @Field(() => String)
  userId: string;

  @Field(() => CounselorType, { defaultValue: CounselorType.PSYHOPE, nullable: false })
  counselorType: CounselorType;

  @Field(() => String, { description: 'The reason for applying for a counseling session' })
  reasonApply: String;

  @Field(() => Boolean)
  closestKnown: Boolean;
}

registerEnumType(CounselorType, {
  name: 'CounselorType',
  description: 'The type of counselor, either PSYHOPE or FACULTY',
})