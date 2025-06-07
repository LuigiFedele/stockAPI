import { DbDeleteCategory, CategoryPostgresRepository } from '../../../infrastructure';
import { DeleteCategoryController } from '../../controllers/category/deleteCategory';
import { RequiredFieldsValidation } from '../../validations/requiredFieldsValidation';

export const deleteCategoryControllerFactory = () => {
  const categoryPostgresRepository = new CategoryPostgresRepository();
  const dbDeleteCategory = new DbDeleteCategory(categoryPostgresRepository);
  const categoryController = new DeleteCategoryController(
    dbDeleteCategory,
    new RequiredFieldsValidation('id'),
  );
  return categoryController;
};
