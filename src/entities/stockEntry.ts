export interface StockEntry {
  id: string;
  productId: string;
  description: string | null;
  price_und: number;
  quantity: number;
}
