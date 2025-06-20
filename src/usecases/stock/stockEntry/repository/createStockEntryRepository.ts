import { StockEntry } from '../../../../entities/stockEntry';
import { CreateStockEntryModel } from '../createStockEntry';

export interface CreateStockEntryRepository {
  create(data: CreateStockEntryModel): Promise<StockEntry>;
}
