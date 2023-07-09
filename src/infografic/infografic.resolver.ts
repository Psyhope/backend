import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { InfograficService } from './infografic.service';
import { Infografic } from './entities/infografic.entity';
import { CreateInfograficInput } from './dto/create-infografic.input';
import { UpdateInfograficInput } from './dto/update-infografic.input';
import { UseGuards } from '@nestjs/common';
import { FacultyAdmin } from 'src/guards/facultyAdmin.guard';
import { PsyhopeAdmin } from 'src/guards/psyhopeAdmin.guard';

@Resolver(() => Infografic)
export class InfograficResolver {
  constructor(private readonly infograficService: InfograficService) { }

  @Mutation(() => Infografic)
  @UseGuards(FacultyAdmin, PsyhopeAdmin)
  createInfografic(
    @Args('createInfograficInput') createInfograficInput: CreateInfograficInput,
  ) {
    return this.infograficService.create(createInfograficInput);
  }

  @Query(() => [Infografic])
  findAll() {
    return this.infograficService.findAll();
  }

  @Query(() => [Infografic])
  findByPage(@Args('page', { type: () => Int }) page: number) {
    return this.infograficService.findOne(page);
  }

  @Query(() => Infografic)
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.infograficService.findOne(id);
  }

  @Mutation(() => Infografic)
  @UseGuards(FacultyAdmin, PsyhopeAdmin)
  updateInfografic(
    @Args('updateInfograficInput') updateInfograficInput: UpdateInfograficInput,
  ) {
    return this.infograficService.update(updateInfograficInput);
  }

  @Mutation(() => Infografic)
  @UseGuards(FacultyAdmin, PsyhopeAdmin)
  removeInfografic(@Args('id', { type: () => Int }) id: number) {
    return this.infograficService.remove(id);
  }
}
