import { DbListStockExit, StockExitPostgresRepository } from '../../../../infrastructure';
import { ListStockExitController } from '../../../../adapters/controllers/stock/stockExit/listStockExit';
import { Controller } from '../../../interfaces';

export const listStockExitsControllerFactory = (): Controller => {
  const stockExitPostgresRepository = new StockExitPostgresRepository();
  const dbListStockExit = new DbListStockExit(stockExitPostgresRepository);
  const stockExitController = new ListStockExitController(dbListStockExit);
  return stockExitController;
};
