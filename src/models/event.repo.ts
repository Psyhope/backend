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
    return await this.db.event.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findByPage(page: number) {
    const take = 10;
    const skip = (page - 1) * 10;
    return await this.db.event.findMany({
      skip,
      take,
      orderBy: {
        createdAt: 'desc',
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

  async findByLimit(limit: number) {
    return await this.db.event.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
    });
  }

  async count() {
    return await this.db.event.count();
  }
}
