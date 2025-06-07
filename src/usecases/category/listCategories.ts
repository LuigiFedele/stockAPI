import { Category } from '../../entities/category';

export interface ListCategories {
  list(): Promise<Category[]>;
}
