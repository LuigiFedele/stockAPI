import { UpdateCategory, UpdateCategoryModel, UpdateCategoryRepository } from '../../../usecases';

export class DbUpdateCategory implements UpdateCategory {
  constructor(private readonly updateCategoryRepository: UpdateCategoryRepository) {}
  async update(category: UpdateCategoryModel): Promise<void> {
    await this.updateCategoryRepository.update(category);
  }
}
