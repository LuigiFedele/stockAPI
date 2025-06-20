import { StockExit } from '../../../../entities/stockExit';

export interface ListStockExitRepository {
  list: () => Promise<StockExit[]>;
}
