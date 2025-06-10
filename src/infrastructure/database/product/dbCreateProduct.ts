import { Product } from '../../../entities/product';
import { CreateProduct, CreateProductModel, CreateProductRepository } from '../../../usecases';

export class DbCreateProduct implements CreateProduct {
  constructor(private readonly createProductRepository: CreateProductRepository) {}
  async create(productData: CreateProductModel): Promise<Product> {
    const product = await this.createProductRepository.create(productData);
    return product;
  }
}
