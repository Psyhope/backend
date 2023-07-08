import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleResolver } from './article.resolver';
import { DbService } from 'src/providers/database/db';

@Module({
  providers: [ArticleResolver, ArticleService, DbService],
  exports: [DbService],
})
export class ArticleModule {}
