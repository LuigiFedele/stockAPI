import { Express, Router } from 'express';
import categoryRoutes from '../routes/categoryRoutes';

export default (app: Express): void => {
  const router = Router();
  categoryRoutes(router);
  app.use('/api', router);
};
