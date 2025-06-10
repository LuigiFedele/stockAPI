import { DbCreateProduct, ProductPostgresRepository } from '../../../infrastructure';
import { CreateProductController } from '../../controllers/product/createProduct';
import { createProductValidationCompositeFactory } from './createProductValidationCompositeFactory';

export const createProductControllerFactory = (): CreateProductController => {
  const productPostgresRepository = new ProductPostgresRepository();
  const dbCreateProduct = new DbCreateProduct(productPostgresRepository);
  const productController = new CreateProductController(
    dbCreateProduct,
    createProductValidationCompositeFactory(),
  );
  return productController;
};
