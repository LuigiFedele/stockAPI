import { Product } from '../../entities/product';
export interface GetProduct {
  get: (productId: string) => Promise<Product | null>;
}
