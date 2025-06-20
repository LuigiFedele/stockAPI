import { StockEntry } from '../../../entities/stockEntry';

export interface ListStockEntry {
  list: () => Promise<StockEntry[]>;
}
