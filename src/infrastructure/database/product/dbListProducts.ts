import { Product } from '../../../entities/product';
import { ListProductsRepository } from '../../../usecases';

export class DbListProducts implements ListProductsRepository {
  constructor(private readonly listProductsRepository: ListProductsRepository) {}
  async list(): Promise<Product[]> {
    const products = await this.listProductsRepository.list();
    return products;
  }
}
