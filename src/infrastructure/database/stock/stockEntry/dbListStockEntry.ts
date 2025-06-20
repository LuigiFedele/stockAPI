import { StockEntry } from '../../../../entities/stockEntry';
import { ListStockEntryRepository } from '../../../../usecases';

export class DbListStockEntry implements ListStockEntryRepository {
  constructor(private readonly listStockEntryRepository: ListStockEntryRepository) {}

  async list(): Promise<StockEntry[]> {
    const entries = await this.listStockEntryRepository.list();
    return entries;
  }
}
