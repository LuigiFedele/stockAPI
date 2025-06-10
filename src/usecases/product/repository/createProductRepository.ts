import { Product } from '../../../entities/product';
import { CreateProductModel } from '../createProduct';

export interface CreateProductRepository {
  create(product: CreateProductModel): Promise<Product>;
}
