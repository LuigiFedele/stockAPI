import { DbListProducts, ProductPostgresRepository } from '../../../infrastructure';
import { ListProductsController } from '../../controllers/product/listProducts';
import { Controller } from '../../interfaces';

export const listProductsControllerFactory = (): Controller => {
  const productPostgresRepository = new ProductPostgresRepository();
  const dbListProducts = new DbListProducts(productPostgresRepository);
  const productController = new ListProductsController(dbListProducts);
  return productController;
};
