import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { EventService } from './event.service';
import { Event } from './entities/event.entity';
import { CreateEventInput } from './dto/create-event.input';
import { UpdateEventInput } from './dto/update-event.input';
import { UseGuards } from '@nestjs/common';
import { FacultyAdmin } from 'src/guards/facultyAdmin.guard';
import { PsyhopeAdmin } from 'src/guards/psyhopeAdmin.guard';

@Resolver(() => Event)
export class EventResolver {
  constructor(private readonly eventService: EventService) {}

  @Mutation(() => Event)
  @UseGuards(FacultyAdmin, PsyhopeAdmin)
  createEvent(@Args('createEventInput') createEventInput: CreateEventInput) {
    return this.eventService.create(createEventInput);
  }

  @Query(() => [Event])
  findAll() {
    return this.eventService.findAll();
  }

  @Query(() => [Event])
  findByPage(@Args('page', { type: () => Int }) page: number) {
    return this.eventService.findByPage(page);
  }

  @Query(() => Event)
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.eventService.findOne(id);
  }

  @Mutation(() => Event)
  @UseGuards(FacultyAdmin, PsyhopeAdmin)
  updateEvent(@Args('updateEventInput') updateEventInput: UpdateEventInput) {
    return this.eventService.update(updateEventInput);
  }

  @Mutation(() => Event)
  @UseGuards(FacultyAdmin, PsyhopeAdmin)
  removeEvent(@Args('id', { type: () => Int }) id: number) {
    return this.eventService.remove(id);
  }
}
