import { UpdateCategoryModel } from '../updateCategory';

export interface UpdateCategoryRepository {
  update(category: UpdateCategoryModel): Promise<Error | void>;
}
