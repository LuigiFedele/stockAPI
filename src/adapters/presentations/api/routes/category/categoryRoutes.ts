import { Router } from 'express';
import { expressRouteAdapter } from '../../../../expressRouteAdapter';
import {
  createCategoryControllerFactory,
  listCategoriesControllerFactory,
  updateCategoryControllerFactory,
  deleteCategoryControllerFactory,
} from '../../../../factories';

export default (router: Router): void => {
  router.post('/category', expressRouteAdapter(createCategoryControllerFactory()));
  router.get('/category', expressRouteAdapter(listCategoriesControllerFactory()));
  router.put('/category', expressRouteAdapter(updateCategoryControllerFactory()));
  router.delete('/category', expressRouteAdapter(deleteCategoryControllerFactory()));
};
