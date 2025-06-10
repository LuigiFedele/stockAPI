import { CreateProduct } from '../../../usecases';
import { Controller, HttpRequest, HttpResponse, Validation } from '../../interfaces';
import {
  badRequest,
  created,
  serverError,
} from '../../presentations/api/httpResponses/httpResponses';

export class CreateProductController implements Controller {
  constructor(
    private readonly createProduct: CreateProduct,
    private readonly validation: Validation,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body);
      if (error) {
        return badRequest(error);
      }

      const { name, description, price, quantity, categoryId } = httpRequest.body;
      if (!name || !description || !price || !quantity || !categoryId) {
        return badRequest(new Error('Missing required fields'));
      }

      const product = await this.createProduct.create({
        name,
        description,
        price,
        quantity,
        categoryId,
        active: true,
      });

      return created(product);
    } catch (error) {
      return serverError(error as Error);
    }
  }
}
