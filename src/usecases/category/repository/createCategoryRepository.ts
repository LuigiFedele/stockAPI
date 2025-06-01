/* eslint-disable no-unused-vars */
import { Category } from '../../../entities/category';
import { CreateCategoryModel } from '../createCategory';

export interface CreateCategoryRepository {
  create(category: CreateCategoryModel): Promise<Category>;
}
