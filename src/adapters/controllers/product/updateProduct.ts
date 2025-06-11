import { UpdateProduct } from '../../../usecases';
import { Controller, HttpRequest, HttpResponse, Validation } from '../../interfaces';
import {
  badRequest,
  noContent,
  serverError,
} from '../../presentations/api/httpResponses/httpResponses';

export class UpdateProductController implements Controller {
  constructor(
    private readonly updateProduct: UpdateProduct,
    private readonly validation: Validation,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const {
        id,
        name,
        description,
        quantity_minimum,
        quantity_supply,
        quantity_maximum,
        active,
        categoryId,
      } = httpRequest.body;

      const error = this.validation.validate({
        id,
        name,
        description,
        quantity_minimum,
        quantity_supply,
        quantity_maximum,
        active,
        categoryId,
      });

      if (error) {
        return badRequest(error);
      }

      await this.updateProduct.update({
        id,
        name,
        description,
        quantity_minimum,
        quantity_supply,
        quantity_maximum,
        active,
        categoryId,
      });

      return noContent();
    } catch (error: any) {
      return serverError(error);
    }
  }
}
