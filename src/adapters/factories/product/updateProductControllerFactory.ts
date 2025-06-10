import { DbUpdateProduct, ProductPostgresRepository } from '../../../infrastructure';
import { UpdateProductController } from '../../controllers/product/updateProduct';
import { RequiredFieldsValidation } from '../../validations/requiredFieldsValidation';

export const updateProductControllerFactory = () => {
  const productPostgresRepository = new ProductPostgresRepository();
  const dbUpdateProduct = new DbUpdateProduct(productPostgresRepository);
  const productController = new UpdateProductController(
    dbUpdateProduct,
    new RequiredFieldsValidation('id'),
  );
  return productController;
};
