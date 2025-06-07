import { Category } from '../../entities/category';

export interface CreateCategoryModel {
  name: string;
}

export interface CreateCategory {
  create(category: CreateCategoryModel): Promise<Category>;
}
