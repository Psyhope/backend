import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleResolver } from './article.resolver';
import { DbService } from 'src/providers/database/db';
import { ArticleRepositories } from 'src/models/article.repo';
import { UserRepositories } from 'src/models/user.repo';
import { SSOAuthService } from 'src/auth/providers/sso.service';

@Module({
  providers: [
    ArticleResolver,
    ArticleService,
    DbService,
    ArticleRepositories,
    SSOAuthService,
    UserRepositories,
  ],
  exports: [
    ArticleResolver,
    ArticleService,
    DbService,
    ArticleRepositories,
    UserRepositories,
    SSOAuthService,
  ],
})
export class ArticleModule { }
