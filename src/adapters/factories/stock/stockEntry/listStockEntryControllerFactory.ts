import { DbListStockEntry, StockEntryPostgresRepository } from '../../../../infrastructure';
import { ListStockEntryController } from '../../../../adapters/controllers/stock/stockEntry/listStockEntry';
import { Controller } from '../../../interfaces';

export const listStockEntriesControllerFactory = (): Controller => {
  const stockEntryPostgresRepository = new StockEntryPostgresRepository();
  const dbListStockEntry = new DbListStockEntry(stockEntryPostgresRepository);
  const stockEntryController = new ListStockEntryController(dbListStockEntry);
  return stockEntryController;
};
