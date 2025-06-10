import { Product } from '../../entities/product';

export interface CreateProductModel {
  name: string;
  description: string;
  price: number;
  quantity: number;
  active: boolean;
  categoryId: string;
}
export interface CreateProduct {
  create: (product: CreateProductModel) => Promise<Product>;
}
