import { StockExit } from '../../../entities/stockExit';

export interface ListStockExit {
  list: () => Promise<StockExit[]>;
}
