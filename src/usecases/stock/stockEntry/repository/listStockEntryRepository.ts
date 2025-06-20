import { StockEntry } from '../../../../entities/stockEntry';

export interface ListStockEntryRepository {
  list: () => Promise<StockEntry[]>;
}
