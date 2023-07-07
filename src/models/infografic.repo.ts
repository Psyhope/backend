import { Injectable } from '@nestjs/common';
import { DbService } from 'src/providers/database/db';

@Injectable()
export class infograficRepositories {
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

  async delete(id: string) {
    return await this.db.user.delete({
      where: {
        id,
      },
    });
  }
}
