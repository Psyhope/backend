import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ArticleService } from './article.service';
import { Article } from './entities/article.entity';
import { CreateArticleInput } from './dto/create-article.input';
import { UpdateArticleInput } from './dto/update-article.input';
import { UseGuards } from '@nestjs/common';
import { FacultyAdmin } from 'src/guards/facultyAdmin.guard';
import { PsyhopeAdmin } from 'src/guards/psyhopeAdmin.guard';

@Resolver(() => Article)
export class ArticleResolver {
  constructor(private readonly articleService: ArticleService) {}

  @Mutation(() => Article)
  @UseGuards(FacultyAdmin, PsyhopeAdmin)
  createArticle(
    @Args('createArticleInput') createArticleInput: CreateArticleInput,
  ) {
    return this.articleService.create(createArticleInput);
  }

  @Query(() => [Article])
  findAll() {
    return this.articleService.findAll();
  }

  @Query(() => Article)
  findByPage(@Args('page', { type: () => Int }) page: number) {
    return this.articleService.findByPage(page);
  }

  @Query(() => Article)
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.articleService.findOne(id);
  }

  @Mutation(() => Article)
  @UseGuards(FacultyAdmin, PsyhopeAdmin)
  updateArticle(
    @Args('updateArticleInput') updateArticleInput: UpdateArticleInput,
  ) {
    return this.articleService.update(updateArticleInput);
  }

  @Mutation(() => Article)
  @UseGuards(FacultyAdmin, PsyhopeAdmin)
  removeArticle(@Args('id', { type: () => Int }) id: number) {
    return this.articleService.remove(id);
  }
}