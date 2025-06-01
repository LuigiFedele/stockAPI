import { Router } from 'express';
import { expressRouteAdapter } from '../../../expressRouteAdapter';
import { createCategoryControllerFactory } from '../../../factories';

export default (router: Router): void => {
  router.post('/category', expressRouteAdapter(createCategoryControllerFactory()));
};
