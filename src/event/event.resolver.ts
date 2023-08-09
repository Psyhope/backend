import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { EventService } from './event.service';
import { Event } from './entities/event.entity';
import { CreateEventInput } from './dto/create-event.input';
import { UpdateEventInput } from './dto/update-event.input';
import { UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { UserRepositories } from 'src/models/user.repo';
import { LoggedIn } from 'src/guards/loggedIn.guard';
import { CurrentUser } from 'src/auth/decorator/currentUser.decorator';
import { JwtPayload } from 'src/auth/interfaces/jwt.payload';
import { Role } from '@prisma/client';

@Resolver(() => Event)
export class EventResolver {
  constructor(
    private readonly eventService: EventService,
    private readonly userRepo: UserRepositories,
  ) {}

  @Mutation(() => Event)
  @UseGuards(LoggedIn)
  async createEvent(
    @Args('createEventInput') createEventInput: CreateEventInput,
    @CurrentUser() user: JwtPayload,
  ) {
    const { account } = await this.userRepo.findById(user.sub);

    if (account.role != Role.PSYHOPE_ADMIN && account.secondRole != Role.PSYHOPE_ADMIN)
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);

    return this.eventService.create(createEventInput);
  }

  @Query(() => [Event])
  findAllEvent() {
    return this.eventService.findAll();
  }

  @Query(() => Event)
  findById(@Args('page', { type: () => Int }) page: number) {}

  @Query(() => [Event])
  findByPageEvent(@Args('page', { type: () => Int }) page: number) {
    return this.eventService.findByPage(page);
  }

  @Query(() => Event)
  findOneEvent(@Args('id', { type: () => Int }) id: number) {
    return this.eventService.findOne(id);
  }

  @Mutation(() => Event)
  @UseGuards(LoggedIn)
  async updateEvent(
    @Args('updateEventInput') updateEventInput: UpdateEventInput,
    @CurrentUser() user: JwtPayload,
  ) {
    const { account } = await this.userRepo.findById(user.sub);

    if (account.role != Role.PSYHOPE_ADMIN && account.secondRole != Role.PSYHOPE_ADMIN) 
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);

    return this.eventService.update(updateEventInput);
  }

  @Mutation(() => Event)
  @UseGuards(LoggedIn)
  async removeEvent(
    @Args('id', { type: () => Int }) id: number,
    @CurrentUser() user: JwtPayload,
  ) {
    const { account } = await this.userRepo.findById(user.sub);

    if (account.role != Role.PSYHOPE_ADMIN && account.secondRole != Role.PSYHOPE_ADMIN)
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);

    return this.eventService.remove(id);
  }

  @Query(() => [Event])
  findByLimitEvent(@Args('limit', { type: () => Int }) limit: number) {
    return this.eventService.findByLimit(limit);
  }

  @Query(() => Number)
  countEvent() {
    return this.eventService.count();
  }
}
