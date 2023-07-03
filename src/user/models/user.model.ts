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
}

@ObjectType()
export class User {
    @Field(() => String)
    id: string

    @Field(() => String)
    username: string

    @Field(() => String)
    fullname: string

    @Field(() => Account)
    account: Account
}
