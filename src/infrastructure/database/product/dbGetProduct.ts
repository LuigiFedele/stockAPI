import { Product } from '../../../entities/product';
import { GetProductRepository } from '../../../usecases';

export class DbGetProduct implements GetProductRepository {
  constructor(private readonly getProductRepository: GetProductRepository) {}
  async get(productId: string): Promise<Product | null> {
    const product = await this.getProductRepository.get(productId);
    return product;
  }
}
