import { Injectable } from '@nestjs/common';
import { DbService } from 'src/providers/database/db';

@Injectable()
export class EventRepositories {
  constructor(private readonly db: DbService) {}

  async create(
    title: string,
    date: Date,
    location: string,
    time: string,
    description: string,
    posterUrl: string,
  ) {
    return await this.db.event.create({
      data: {
        title,
        date,
        location,
        time,
        description,
        posterUrl,
      },
    });
  }

  async findById(id: number) {
    return await this.db.event.findUnique({
      where: {
        id: id,
      },
    });
  }

  async update(
    id: number,
    title: string,
    date: Date,
    location: string,
    time: string,
    description: string,
    posterUrl: string,
  ) {
    return await this.db.event.update({
      where: {
        id,
      },
      data: {
        title,
        date,
        location,
        time,
        description,
        posterUrl,
      },
    });
  }

  async delete(id: number) {
    return await this.db.event.delete({
      where: {
        id,
      },
    });
  }
}
