import { DbUpdateCategory, CategoryPostgresRepository } from '../../../infrastructure';
import { UpdateCategoryController } from '../../controllers/category/updateCategory';
import { RequiredFieldsValidation } from '../../validations/requiredFieldsValidation';

export const updateCategoryControllerFactory = () => {
  const categoryPostgresRepository = new CategoryPostgresRepository();
  const dbUpdateCategory = new DbUpdateCategory(categoryPostgresRepository);
  const categoryController = new UpdateCategoryController(
    dbUpdateCategory,
    new RequiredFieldsValidation('id'),
  );
  return categoryController;
};
