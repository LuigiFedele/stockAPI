import { Product } from '../../../entities/product';

export interface ListProductsRepository {
  list: () => Promise<Product[]>;
}
