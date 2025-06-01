/* eslint-disable no-unused-vars */
import { Category } from '../../../entities/category';
import { CreateCategory, CreateCategoryModel, CreateCategoryRepository } from '../../../usecases';

export class DbCreateCategory implements CreateCategory {
  constructor(private readonly createCategoryRepository: CreateCategoryRepository) {}
  async create(categoryData: CreateCategoryModel): Promise<Category> {
    const category = await this.createCategoryRepository.create(categoryData);
    return category;
  }
}
