import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ArticleService } from './article.service';
import { Article } from './entities/article.entity';
import { CreateArticleInput } from './dto/create-article.input';
import { UpdateArticleInput } from './dto/update-article.input';
import { UseGuards } from '@nestjs/common';
import { FacultyAdmin } from 'src/guards/facultyAdmin.guard';
import { PsyhopeAdmin } from 'src/guards/psyhopeAdmin.guard';
import { LoggedIn } from 'src/guards/loggedIn.guard';

@Resolver(() => Article)
export class ArticleResolver {
  constructor(private readonly articleService: ArticleService) {}

  @Mutation(() => Article)
  @UseGuards(LoggedIn, FacultyAdmin, PsyhopeAdmin)
  createArticle(
    @Args('createArticleInput') createArticleInput: CreateArticleInput,
  ) {
    return this.articleService.create(createArticleInput);
  }

  @Query(() => [Article])
  findAllArticle() {
    return this.articleService.findAll();
  }

  @Query(() => [Article])
  findByPageArticle(@Args('page', { type: () => Int }) page: number) {
    return this.articleService.findByPage(page);
  }

  @Query(() => Article)
  findOneArticle(@Args('id', { type: () => Int }) id: number) {
    return this.articleService.findOne(id);
  }

  @Mutation(() => Article)
  @UseGuards(LoggedIn, FacultyAdmin, PsyhopeAdmin)
  updateArticle(
    @Args('updateArticleInput') updateArticleInput: UpdateArticleInput,
  ) {
    return this.articleService.update(updateArticleInput);
  }

  @Mutation(() => Article)
  @UseGuards(LoggedIn, FacultyAdmin, PsyhopeAdmin)
  removeArticle(@Args('id', { type: () => Int }) id: number) {
    return this.articleService.remove(id);
  }
}
