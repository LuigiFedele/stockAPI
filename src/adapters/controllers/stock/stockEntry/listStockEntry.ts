import { ListStockEntry } from '../../../../usecases';
import { Controller, HttpRequest, HttpResponse } from '../../../interfaces';
import { noContent, ok, serverError } from '../../../presentations/api/httpResponses/httpResponses';

export class ListStockEntryController implements Controller {
  constructor(private readonly listStockEntry: ListStockEntry) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const stockEntries = await this.listStockEntry.list();
      return stockEntries.length > 0 ? ok(stockEntries) : noContent();
    } catch (error) {
      return serverError(error as Error);
    }
  }
}
