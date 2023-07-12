import { Injectable } from '@nestjs/common';
import { CreateArticleInput } from './dto/create-article.input';
import { UpdateArticleInput } from './dto/update-article.input';
import { ArticleRepositories } from 'src/models/article.repo';

@Injectable()
export class ArticleService {
  constructor(private readonly articleRepo: ArticleRepositories) {}

  create(createArticleInput: CreateArticleInput) {
    const { title, content, posterUrl, thumbnailUrl } = createArticleInput;
    return this.articleRepo.create(title, content, posterUrl, thumbnailUrl);
  }

  findAll() {
    return this.articleRepo.findAll();
  }

  findByPage(page: number) {
    return this.articleRepo.findByPage(page);
  }

  findOne(id: number) {
    return this.articleRepo.findById(id);
  }

  update(updateArticleInput: UpdateArticleInput) {
    const { id, title, content, posterUrl, thumbnailUrl } = updateArticleInput;
    return this.articleRepo.update(id, title, content, posterUrl, thumbnailUrl);
  }

  remove(id: number) {
    return this.articleRepo.delete(id);
  }
}
