<<<<<<< HEAD
import { Field, ObjectType, registerEnumType } from "@nestjs/graphql";

@ObjectType()
export class Account {
    @Field(() => String)
    faculty: string

    @Field(() => String)
    role: string

    @Field(() => String)
    gender: string

    @Field(() => String)
    major: string
=======
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';

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
>>>>>>> 7fdee32e9e550da9a133fd842fb57bdadc9e8bfa
}

@ObjectType()
export class User {
<<<<<<< HEAD
    @Field(() => String)
    id: string

    @Field(() => String)
    username: string

    @Field(() => String)
    fullname: string

    @Field(() => Account)
    account: Account
=======
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

  @Field(() => String, {nullable: true})
  lineAcc: String;

  @Field(() => String, {nullable: true})
  igAcc: String;
>>>>>>> 7fdee32e9e550da9a133fd842fb57bdadc9e8bfa
}
