import { Category } from '../../../entities/category';

export interface ListCategoriesRepository {
  list(): Promise<Category[]>;
}
