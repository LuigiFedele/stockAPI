import { DbCreateStockExit, StockExitPostgresRepository } from '../../../../infrastructure';
import { CreateStockExitController } from '../../../../adapters/controllers/stock/stockExit/createStockExit';
import { createStockExitValidationControllerFactory } from './createStockExitValidationControllerFactory';

export const createStockExitControllerFactory = (): CreateStockExitController => {
  const stockExitPostgresRepository = new StockExitPostgresRepository();
  const dbCreateStockExit = new DbCreateStockExit(stockExitPostgresRepository);
  const stockExitController = new CreateStockExitController(
    dbCreateStockExit,
    createStockExitValidationControllerFactory(),
  );

  return stockExitController;
};
