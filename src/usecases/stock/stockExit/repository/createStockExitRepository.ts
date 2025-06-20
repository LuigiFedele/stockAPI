import { StockExit } from '../../../../entities/stockExit';
import { CreateStockExitModel } from '../createStockExit';

export interface CreateStockExitRepository {
  create(data: CreateStockExitModel): Promise<StockExit>;
}
