import { Injectable } from '@nestjs/common';
import { CreateInfograficInput } from './dto/create-infografic.input';
import { UpdateInfograficInput } from './dto/update-infografic.input';
import { InfograficRepositories } from 'src/models/infografic.repo';

@Injectable()
export class InfograficService {
  constructor(private readonly infograficRepo: InfograficRepositories) {}

  create(createInfograficInput: CreateInfograficInput) {
    const { title, description, infograficUrl } = createInfograficInput;
    return this.infograficRepo.create(title, description, infograficUrl);
  }

  findAll() {
    return this.infograficRepo.findByAll();
  }

  findByPage(page: number) {
    return this.infograficRepo.findByPage(page);
  }

  findOne(id: number) {
    return this.infograficRepo.findById(id);
  }

  update(updateInfograficInput: UpdateInfograficInput) {
    const { id, title, description, infograficUrl } = updateInfograficInput;
    return this.infograficRepo.update(id, title, description, infograficUrl);
  }

  remove(id: number) {
    return this.infograficRepo.delete(id);
  }

  findByLimit(limit: number) {
    return this.infograficRepo.findByLimit(limit);
  }

  count() {
    return this.infograficRepo.count();
  }
}
