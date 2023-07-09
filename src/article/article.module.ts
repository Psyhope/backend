import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleResolver } from './article.resolver';
import { DbService } from 'src/providers/database/db';
import { ArticleRepositories } from 'src/models/article.repo';

@Module({
  providers: [ArticleResolver, ArticleService, DbService, ArticleRepositories],
<<<<<<< HEAD
  exports: [DbService, ArticleRepositories],
=======
  exports: [ArticleResolver, ArticleService, DbService, ArticleRepositories],
>>>>>>> a2c736524cd51aaf6571c4a9ede063f3feda5b74
})
export class ArticleModule {}
