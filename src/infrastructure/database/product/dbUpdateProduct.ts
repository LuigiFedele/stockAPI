import { UpdateProduct, UpdateProductModel, UpdateProductRepository } from '../../../usecases';

export class DbUpdateProduct implements UpdateProduct {
  constructor(private readonly updateProductRepository: UpdateProductRepository) {}
  async update(product: UpdateProductModel): Promise<void> {
    await this.updateProductRepository.update(product);
  }
}
