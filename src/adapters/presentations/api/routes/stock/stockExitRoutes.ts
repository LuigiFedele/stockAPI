import { Router } from 'express';
import { expressRouteAdapter } from '../../../../expressRouteAdapter';
import {
  createStockExitControllerFactory,
  listStockExitsControllerFactory,
} from '../../../../factories';

export default (router: Router): void => {
  router.post('/exits', expressRouteAdapter(createStockExitControllerFactory()));
  router.get('/exits', expressRouteAdapter(listStockExitsControllerFactory()));
};
