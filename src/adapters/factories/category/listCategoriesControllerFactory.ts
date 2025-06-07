import { DbListCategories, CategoryPostgresRepository } from '../../../infrastructure';
import { ListCategoriesController } from '../../controllers/category/listCategories';
import { Controller } from '../../interfaces/controller';

export const listCategoriesControllerFactory = (): Controller => {
  const categoryPostgresRepository = new CategoryPostgresRepository();
  const dbListCategories = new DbListCategories(categoryPostgresRepository);
  const categoryController = new ListCategoriesController(dbListCategories);
  return categoryController;
};
