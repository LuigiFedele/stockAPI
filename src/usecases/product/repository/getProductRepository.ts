import { Product } from '../../../entities/product';
export interface GetProductRepository {
  get: (productId: string) => Promise<Product | null>;
}
