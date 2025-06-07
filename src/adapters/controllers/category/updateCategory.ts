import { UpdateCategory } from '../../../usecases';
import { Controller, HttpRequest, HttpResponse, Validation } from '../../interfaces';
import {
  noContent,
  serverError,
  badRequest,
} from '../../presentations/api/httpResponses/httpResponses';

export class UpdateCategoryController implements Controller {
  constructor(
    private readonly updateCategory: UpdateCategory,
    private readonly validation: Validation,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id, name } = httpRequest.body;
      const isInvalid = this.validation.validate({ id, name });
      if (isInvalid) {
        return badRequest(isInvalid);
      }
      const error = await this.updateCategory.update({ id, name });
      if (error) {
        return serverError(error);
      }

      return noContent();
    } catch (error: any) {
      return serverError(error);
    }
  }
}
