import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ArticleService } from './article.service';
import { Article } from './entities/article.entity';
import { CreateArticleInput } from './dto/create-article.input';
import { UpdateArticleInput } from './dto/update-article.input';
import { UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { LoggedIn } from 'src/guards/loggedIn.guard';
import { CurrentUser } from 'src/auth/decorator/currentUser.decorator';
import { JwtPayload } from 'src/auth/interfaces/jwt.payload';
import { UserRepositories } from 'src/models/user.repo';
import { Role } from '@prisma/client';

@Resolver(() => Article)
export class ArticleResolver {
  constructor(
    private readonly articleService: ArticleService,
    private readonly userRepo: UserRepositories,
  ) {}

  @Mutation(() => Article)
  @UseGuards(LoggedIn)
  async createArticle(
    @Args('createArticleInput') createArticleInput: CreateArticleInput,
    @CurrentUser() user: JwtPayload,
  ) {
    const { account } = await this.userRepo.findById(user.sub);

    if (
      account.role != Role.PSYHOPE_ADMIN &&
      account.role != Role.FACULTY_ADMIN
    )
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);

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
  @UseGuards(LoggedIn)
  async updateArticle(
    @Args('updateArticleInput') updateArticleInput: UpdateArticleInput,
    @CurrentUser() user: JwtPayload,
  ) {
    const { account } = await this.userRepo.findById(user.sub);

    if (
      account.role != Role.PSYHOPE_ADMIN &&
      account.role != Role.FACULTY_ADMIN
    )
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);

    return this.articleService.update(updateArticleInput);
  }

  @Mutation(() => Article)
  @UseGuards(LoggedIn)
  async removeArticle(
    @Args('id', { type: () => Int }) id: number,
    @CurrentUser() user: JwtPayload,
  ) {
    const { account } = await this.userRepo.findById(user.sub);

    if (
      account.role != Role.PSYHOPE_ADMIN &&
      account.role != Role.FACULTY_ADMIN
    )
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);

    return this.articleService.remove(id);
  }

  @Query(() => [Article])
  findByLimitArticle(@Args('limit', { type: () => Int }) limit: number) {
    return this.articleService.findByLimit(limit);
  }

  @Query(() => Number)
  countArticle() {
    return this.articleService.count();
  }
}
