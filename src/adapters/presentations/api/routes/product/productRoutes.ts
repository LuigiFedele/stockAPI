import { Router } from 'express';
import { expressRouteAdapter } from '../../../../expressRouteAdapter';
import {
  createProductControllerFactory,
  getProductControllerFactory,
  listProductsControllerFactory,
  updateProductControllerFactory,
} from '../../../../factories';

export default (router: Router): void => {
  router.post('/product', expressRouteAdapter(createProductControllerFactory()));
  router.get('/product', expressRouteAdapter(listProductsControllerFactory()));
  router.get('/product/:id', expressRouteAdapter(getProductControllerFactory()));
  router.put('/product', expressRouteAdapter(updateProductControllerFactory()));
};
