export interface UpdateProductModel {
  id: string;
  name?: string;
  description?: string;
  price?: number;
  quantity?: number;
  active?: boolean;
  categoryId?: string;
}

export interface UpdateProduct {
  update: (product: UpdateProductModel) => Promise<Error | void>;
}
