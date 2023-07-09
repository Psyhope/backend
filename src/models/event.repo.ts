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

  async findAll() {
    return await this.db.event.findMany();
  }

  async findByPage(page: number) {
    const take = 10;
    const skip = (page - 1) * 10;
    return await this.db.event.findMany({
      skip,
      take,
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
