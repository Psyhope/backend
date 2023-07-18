import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';

export enum CounselorType {
  PSYHOPE = "PSYHOPE",
  FACULTY = "FACULTY"
}

export enum Topic {
  TOPIC_1 = "TOPIC_1",
  TOPIC_2 = "TOPIC_2",
  TOPIC_3 = "TOPIC_3"
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

  @Field(() => [Topic], {nullable:false})
  bookingTopic: Topic[];

  @Field(() => String, { description: 'The reason for applying for a counseling session' })
  reasonApply: String;

  @Field(() => Boolean)
  closestKnown: Boolean;
}

registerEnumType(CounselorType, {
  name: 'CounselorType',
  description: 'The type of counselor, either PSYHOPE or FACULTY',
})

registerEnumType(Topic, {
  name: 'bookingTopic',
  description: 'The type of counselor, either PSYHOPE or FACULTY',
})