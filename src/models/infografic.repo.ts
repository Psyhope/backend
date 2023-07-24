import { Injectable } from '@nestjs/common';
import { DbService } from 'src/providers/database/db';

@Injectable()
export class InfograficRepositories {
  constructor(private readonly db: DbService) {}

  async create(title: string, description: string, infograficUrl: string) {
    return await this.db.infografic.create({
      data: {
        title,
        description,
        infograficUrl,
      },
    });
  }

  async findByAll() {
    return await this.db.infografic.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findByPage(page: number) {
    const take = 10;
    const skip = (page - 1) * 10;
    return await this.db.infografic.findMany({
      skip,
      take,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findById(id: number) {
    return await this.db.infografic.findUnique({
      where: {
        id: id,
      },
    });
  }

  async update(
    id: number,
    title: string,
    description: string,
    infograficUrl: string,
  ) {
    return await this.db.infografic.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        infograficUrl,
      },
    });
  }

  async delete(id: number) {
    return await this.db.infografic.delete({
      where: {
        id,
      },
    });
  }

  async findByLimit(limit: number) {
    return await this.db.infografic.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
    });
  }

  async count() {
    return await this.db.infografic.count();
  }
}
