import { DbCreateStockEntry, StockEntryPostgresRepository } from '../../../../infrastructure';
import { CreateStockEntryController } from '../../../../adapters/controllers/stock/stockEntry/createStockEntry';
import { createStockEntryValidationControllerFactory } from './createStockEntryValidationControllerFactory';

export const createStockEntryControllerFactory = (): CreateStockEntryController => {
  const stockEntryPostgresRepository = new StockEntryPostgresRepository();
  const dbCreateStockEntry = new DbCreateStockEntry(stockEntryPostgresRepository);
  const stockEntryController = new CreateStockEntryController(
    dbCreateStockEntry,
    createStockEntryValidationControllerFactory(),
  );
  return stockEntryController;
};
