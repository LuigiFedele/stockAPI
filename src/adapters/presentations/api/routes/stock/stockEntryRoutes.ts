import { Router } from 'express';
import { expressRouteAdapter } from '../../../../expressRouteAdapter';
import {
  createStockEntryControllerFactory,
  listStockEntriesControllerFactory,
} from '../../../../factories';

export default (router: Router): void => {
  router.post('/entries', expressRouteAdapter(createStockEntryControllerFactory()));
  router.get('/entries', expressRouteAdapter(listStockEntriesControllerFactory()));
};
