import { DbCreateCategory, CategoryPostgresRepository } from '../../../infrastructure';
import { CreateCategoryController } from '../../controllers/category/createCategory';
import { createCategoryValidationCompositeFactory } from './createCategoryValidationCompositeFactory';

export const createCategoryControllerFactory = () => {
  const categoryPostgresRepository = new CategoryPostgresRepository();
  const dbCreateCategory = new DbCreateCategory(categoryPostgresRepository);
  const categoryController = new CreateCategoryController(
    dbCreateCategory,
    createCategoryValidationCompositeFactory(),
  );
  return categoryController;
};
