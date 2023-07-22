import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { CounselorType } from './const.entity'
import { User } from 'src/user/models/user.model';

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

  @Field(() => User, {nullable:true})
  user: User
}