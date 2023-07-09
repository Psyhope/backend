import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleResolver } from './article.resolver';
import { DbService } from 'src/providers/database/db';
import { ArticleRepositories } from 'src/models/article.repo';

@Module({
  providers: [ArticleResolver, ArticleService, DbService, ArticleRepositories],
  exports: [ArticleResolver, ArticleService, DbService, ArticleRepositories],
})
export class ArticleModule { }
