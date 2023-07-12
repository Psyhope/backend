import { Injectable } from '@nestjs/common';
import { DbService } from 'src/providers/database/db';

@Injectable()
export class ArticleRepositories {
  constructor(private readonly db: DbService) {}

  async create(
    title: string,
    content: string,
    posterUrl: string,
    thumbnailUrl: string,
  ) {
    return await this.db.article.create({
      data: {
        title,
        content,
        posterUrl,
        thumbnailUrl,
      },
    });
  }

  async findAll() {
    return await this.db.article.findMany();
  }

  async findByPage(page: number) {
    const take = 10;
    const skip = (page - 1) * 10;
    return await this.db.article.findMany({
      skip,
      take,
    });
  }

  async findById(id: number) {
    return await this.db.article.findUnique({
      where: {
        id: id,
      },
    });
  }

  async update(
    id: number,
    title: string,
    content: string,
    posterUrl: string,
    thumbnailUrl: string,
  ) {
    return await this.db.article.update({
      where: {
        id,
      },
      data: {
        title,
        content,
        posterUrl,
        thumbnailUrl,
      },
    });
  }

  async delete(id: number) {
    return await this.db.article.delete({
      where: {
        id,
      },
    });
  }
}
