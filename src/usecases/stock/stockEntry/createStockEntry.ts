import { StockEntry } from '../../../entities/stockEntry';

export interface CreateStockEntryModel {
  productId: string;
  description: string;
  price_und: number;
  quantity: number;
}

export interface CreateStockEntry {
  create: (data: CreateStockEntryModel) => Promise<StockEntry>;
}
