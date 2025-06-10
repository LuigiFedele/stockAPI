import { UpdateProductModel } from '../updateProduct';

export interface UpdateProductRepository {
  update(product: UpdateProductModel): Promise<Error | void>;
}
