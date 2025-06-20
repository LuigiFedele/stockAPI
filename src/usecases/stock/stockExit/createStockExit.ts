import { StockExit } from '../../../entities/stockExit';

export interface CreateStockExitModel {
  productId: string;
  description: string;
  price_und: number;
  quantity: number;
}

export interface CreateStockExit {
  create: (data: CreateStockExitModel) => Promise<StockExit>;
}
