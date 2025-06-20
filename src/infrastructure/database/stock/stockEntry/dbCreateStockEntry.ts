import { StockEntry } from '../../../../entities/stockEntry';
import {
  CreateStockEntry,
  CreateStockEntryModel,
  CreateStockEntryRepository,
} from '../../../../usecases';

export class DbCreateStockEntry implements CreateStockEntry {
  constructor(private readonly createStockEntryRepository: CreateStockEntryRepository) {}
  async create(data: CreateStockEntryModel): Promise<StockEntry> {
    const stockEntry = await this.createStockEntryRepository.create(data);
    return stockEntry;
  }
}
