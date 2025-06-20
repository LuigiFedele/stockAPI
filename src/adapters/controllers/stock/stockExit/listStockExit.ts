import { ListStockExit } from '../../../../usecases';
import { Controller, HttpRequest, HttpResponse } from '../../../interfaces';
import { noContent, ok, serverError } from '../../../presentations/api/httpResponses/httpResponses';

export class ListStockExitController implements Controller {
  constructor(private readonly listStockExit: ListStockExit) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const stockEntries = await this.listStockExit.list();
      return stockEntries.length > 0 ? ok(stockEntries) : noContent();
    } catch (error) {
      return serverError(error as Error);
    }
  }
}
