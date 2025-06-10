import { GetProduct } from '../../../usecases';
import { Controller, HttpRequest, HttpResponse } from '../../interfaces';
import { noContent, ok, serverError } from '../../presentations/api/httpResponses/httpResponses';

export class GetProductController implements Controller {
  constructor(private readonly getProduct: GetProduct) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params;
      const product = await this.getProduct.get(id);
      return product ? ok(product) : noContent();
    } catch (error: any) {
      return serverError(error);
    }
  }
}
