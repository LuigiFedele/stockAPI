import { CreateStockExit } from '../../../../usecases';
import { Controller, HttpRequest, HttpResponse, Validation } from '../../../interfaces';
import {
  badRequest,
  created,
  serverError,
} from '../../../presentations/api/httpResponses/httpResponses';

export class CreateStockExitController implements Controller {
  constructor(
    private readonly createStockExit: CreateStockExit,
    private readonly validation: Validation,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body);
      if (error) {
        return badRequest(error);
      }
      const { description, price_und, quantity, productId } = httpRequest.body;

      if (!description || !price_und || !quantity || !productId) {
        return badRequest(new Error('Missing required fields'));
      }

      const stockExit = await this.createStockExit.create({
        productId,
        description,
        price_und,
        quantity,
      });

      return created(stockExit);
    } catch (error) {
      return serverError(error as Error);
    }
  }
}
