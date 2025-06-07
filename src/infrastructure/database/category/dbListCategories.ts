import { Category } from '../../../entities/category';
import { ListCategoriesRepository } from '../../../usecases';

export class DbListCategories implements ListCategoriesRepository {
  constructor(private readonly listCategoriesRepository: ListCategoriesRepository) {}
  async list(): Promise<Category[]> {
    const categories = await this.listCategoriesRepository.list();
    return categories;
  }
}
