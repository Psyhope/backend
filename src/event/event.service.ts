import { Injectable } from '@nestjs/common';
import { CreateEventInput } from './dto/create-event.input';
import { UpdateEventInput } from './dto/update-event.input';
import { EventRepositories } from 'src/models/event.repo';

@Injectable()
export class EventService {
  constructor(private readonly eventRepo: EventRepositories) {}

  create(createEventInput: CreateEventInput) {
    const { title, date, location, time, description, posterUrl } =
      createEventInput;
    return this.eventRepo.create(
      title,
      date,
      location,
      time,
      description,
      posterUrl,
    );
  }

  findAll() {
    return this.eventRepo.findAll();
  }

  findByPage(page: number) {
    return this.eventRepo.findByPage(page);
  }

  findOne(id: number) {
    return this.eventRepo.findById(id);
  }

  update(updateEventInput: UpdateEventInput) {
    const { id, title, date, location, time, description, posterUrl } =
      updateEventInput;
    return this.eventRepo.update(
      id,
      title,
      date,
      location,
      time,
      description,
      posterUrl,
    );
  }

  remove(id: number) {
    return this.eventRepo.delete(id);
  }
}
