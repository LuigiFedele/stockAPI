import { Express, Router } from 'express';
import categoryRoutes from '../routes/category/categoryRoutes';
import productRoutes from '../routes/product/productRoutes';

export default (app: Express): void => {
  const router = Router();
  categoryRoutes(router);
  productRoutes(router);
  app.use('/api', router);
};
