import { Express, Router } from 'express';
import categoryRoutes from '../routes/category/categoryRoutes';
import productRoutes from '../routes/product/productRoutes';
import stockEntryRoutes from '../routes/stock/stockEntryRoutes';
import stockExitRoutes from '../routes/stock/stockExitRoutes';

export default (app: Express): void => {
  const router = Router();
  categoryRoutes(router);
  productRoutes(router);
  stockEntryRoutes(router);
  stockExitRoutes(router);
  app.use('/api', router);
};
