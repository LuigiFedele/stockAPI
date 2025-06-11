import { Product } from '../../entities/product';

export interface CreateProductModel {
  name: string;
  description: string;
  quantity_minimum: number;
  quantity_supply: number;
  quantity_maximum: number;
  active: boolean;
  categoryId: string;
}
export interface CreateProduct {
  create: (product: CreateProductModel) => Promise<Product>;
}
