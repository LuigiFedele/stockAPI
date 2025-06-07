import { DeleteCategoryModel } from '../deleteCategory';

export interface DeleteCategoryRepository {
  delete(category: DeleteCategoryModel): Promise<void>;
}
