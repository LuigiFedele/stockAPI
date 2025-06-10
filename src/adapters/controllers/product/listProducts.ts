import { ListProducts } from '../../../usecases';
import { Controller, HttpRequest, HttpResponse } from '../../interfaces';
import { noContent, ok, serverError } from '../../presentations/api/httpResponses/httpResponses';

export class ListProductsController implements Controller {
  constructor(private readonly listProducts: ListProducts) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const products = await this.listProducts.list();
      return products.length > 0 ? ok(products) : noContent();
    } catch (error: any) {
      return serverError(error);
    }
  }
}
