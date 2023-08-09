import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { InfograficService } from './infografic.service';
import { Infografic } from './entities/infografic.entity';
import { CreateInfograficInput } from './dto/create-infografic.input';
import { UpdateInfograficInput } from './dto/update-infografic.input';
import { UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorator/currentUser.decorator';
import { JwtPayload } from 'src/auth/interfaces/jwt.payload';
import { LoggedIn } from 'src/guards/loggedIn.guard';
import { UserRepositories } from 'src/models/user.repo';
import { Role } from '@prisma/client';

@Resolver(() => Infografic)
export class InfograficResolver {
  constructor(
    private readonly infograficService: InfograficService,
    private readonly userRepo: UserRepositories,
  ) {}

  @Mutation(() => Infografic)
  @UseGuards(LoggedIn)
  async createInfografic(
    @Args('createInfograficInput') createInfograficInput: CreateInfograficInput,
    @CurrentUser() user: JwtPayload,
  ) {
    const { account } = await this.userRepo.findById(user.sub);

    if (account.role != Role.PSYHOPE_ADMIN && account.secondRole != Role.PSYHOPE_ADMIN)
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);

    return this.infograficService.create(createInfograficInput);
  }

  @Query(() => [Infografic])
  findAllInfografic() {
    return this.infograficService.findAll();
  }

  @Query(() => [Infografic])
  findByPageInfografic(@Args('page', { type: () => Int }) page: number) {
    return this.infograficService.findByPage(page);
  }

  @Query(() => Infografic)
  findOneInfografic(@Args('id', { type: () => Int }) id: number) {
    return this.infograficService.findOne(id);
  }

  @Mutation(() => Infografic)
  @UseGuards(LoggedIn)
  async updateInfografic(
    @Args('updateInfograficInput') updateInfograficInput: UpdateInfograficInput,
    @CurrentUser() user: JwtPayload,
  ) {
    const { account } = await this.userRepo.findById(user.sub);

    if (account.role != Role.PSYHOPE_ADMIN && account.secondRole != Role.PSYHOPE_ADMIN)
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);

    return this.infograficService.update(updateInfograficInput);
  }

  @Mutation(() => Infografic)
  @UseGuards(LoggedIn)
  async removeInfografic(
    @Args('id', { type: () => Int }) id: number,
    @CurrentUser() user: JwtPayload,
  ) {
    const { account } = await this.userRepo.findById(user.sub);

    if (account.role != Role.PSYHOPE_ADMIN && account.secondRole != Role.PSYHOPE_ADMIN)
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);

    return this.infograficService.remove(id);
  }

  @Query(() => [Infografic])
  findByLimitInfografic(@Args('limit', { type: () => Int }) limit: number) {
    return this.infograficService.findByLimit(limit);
  }

  @Query(() => Number)
  countInfografic() {
    return this.infograficService.count();
  }
}
