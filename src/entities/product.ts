export interface Product {
  id: string;
  name: string;
  description: string;
  quantity_minimum: number;
  quantity_supply: number;
  quantity_maximum: number;
  active: boolean;
  categoryId: string;
}
