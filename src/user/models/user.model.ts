import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Booking } from 'src/booking/entities/booking.entity';

export enum Channel {
  LINE = "LINE",
  INSTAGRAM = "INSTAGRAM"
}

registerEnumType(Channel, {
  name: 'Channel'
})

@ObjectType()
export class Account {
  @Field(() => String)
  faculty: string;

  @Field(() => String)
  role: string;

  @Field(() => String)
  gender: string;

  @Field(() => String)
  major: string;

  @Field(() => Channel)
  channel: Channel
}

@ObjectType()
export class User {
  @Field(() => String)
  id: string;

  @Field(() => String)
  username: string;

  @Field(() => String)
  fullname: string;

  @Field(() => Account)
  account: Account;

  @Field(() => Boolean)
  isOnboarded: Boolean;

  @Field(() => [Booking])
  bookings: Booking[];

  @Field(() => String, { nullable: true })
  lineAcc: String;

  @Field(() => String, { nullable: true })
  igAcc: String;
}
