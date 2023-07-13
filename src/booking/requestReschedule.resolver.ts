import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { RescheduleRequest } from "./entities/recheduleRequest.entity";
import { Booking } from "./entities/booking.entity";
import { RescheduleRequestRepositories } from "src/models/requestReschedule.repo";
import { BookingRepositories } from "src/models/booking.repo";

@Resolver(() => RescheduleRequest)
export class RequestRescheduleResolver {
    constructor(
        private readonly rescheduleRequestRepo: RescheduleRequestRepositories,
        private readonly bookingRepo: BookingRepositories
    ) { }

    @ResolveField('booking', () => Booking)
    async booking(@Parent() rescheduleRequest: RescheduleRequest) {
        const { id } = rescheduleRequest;
        const { bookingId } = await this.rescheduleRequestRepo.findById(id);
        return await this.bookingRepo.findById(bookingId);
    }
}