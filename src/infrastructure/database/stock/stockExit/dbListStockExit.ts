import { StockExit } from '../../../../entities/stockExit';
import { ListStockExitRepository } from '../../../../usecases';

export class DbListStockExit implements ListStockExitRepository {
  constructor(private readonly listStockExitRepository: ListStockExitRepository) {}

  async list(): Promise<StockExit[]> {
    const exits = await this.listStockExitRepository.list();
    return exits;
  }
}
