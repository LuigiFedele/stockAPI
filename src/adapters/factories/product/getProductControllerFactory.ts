import { DbGetProduct, ProductPostgresRepository } from '../../../infrastructure';
import { GetProductController } from '../../controllers/product/getProduct';
import { Controller } from '../../interfaces';

export const getProductControllerFactory = (): Controller => {
  const productPostgresRepository = new ProductPostgresRepository();
  const dbGetProduct = new DbGetProduct(productPostgresRepository);
  const productController = new GetProductController(dbGetProduct);
  return productController;
};
