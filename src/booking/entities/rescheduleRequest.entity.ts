import { Field, ObjectType } from "@nestjs/graphql";
import { Booking } from "./booking.entity";

@ObjectType()
export class RescheduleRequest {
    @Field(() => Booking)
    booking: Booking;

    @Field(() => Date)
    time: Date;
}