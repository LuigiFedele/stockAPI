import { StockExit } from '../../../../entities/stockExit';
import {
  CreateStockExit,
  CreateStockExitModel,
  CreateStockExitRepository,
} from '../../../../usecases';

export class DbCreateStockExit implements CreateStockExit {
  constructor(private readonly createStockExitRepository: CreateStockExitRepository) {}
  async create(data: CreateStockExitModel): Promise<StockExit> {
    const stockExit = await this.createStockExitRepository.create(data);
    return stockExit;
  }
}
