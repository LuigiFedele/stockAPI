import { DeleteCategory, DeleteCategoryModel, DeleteCategoryRepository } from '../../../usecases';

export class DbDeleteCategory implements DeleteCategory {
  constructor(private readonly deleteCategoryRepository: DeleteCategoryRepository) {}
  async delete(category: DeleteCategoryModel): Promise<Error | void> {
    return await this.deleteCategoryRepository.delete(category);
  }
}
